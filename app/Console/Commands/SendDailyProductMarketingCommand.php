<?php

namespace App\Console\Commands;

use App\Mail\ProductMarketingMail;
use App\Models\ActivityLog;
use App\Models\AdminUser;
use App\Models\Inquiry;
use App\Models\MarketingCampaign;
use App\Models\MarketingUnsubscribe;
use App\Models\Product;
use App\Models\User;
use App\Models\WorldPlanRegistration;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendDailyProductMarketingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketing:send-daily-product
                            {--product= : Specific product slug or ID to spotlight}
                            {--test-email= : Send only to this specific email address}
                            {--dry-run : Simulate dispatch without sending actual emails}
                            {--force : Force send even if already sent today}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send rotating daily product marketing email to all emails recorded across the entire system database.';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $today = now()->toDateString();
        $this->info("=== INFINITE Daily Product Marketing Dispatcher [{$today}] ===");

        // 1. Check if already dispatched today unless forced
        if (!$this->option('force') && !$this->option('test-email')) {
            $existing = MarketingCampaign::where('sent_date', $today)->first();
            if ($existing) {
                $this->warn("A daily marketing campaign was already dispatched today for product: {$existing->product_name}. Use --force to re-send.");
                return Command::SUCCESS;
            }
        }

        // 2. Select rotating product
        $products = Product::active()->orderBy('display_order')->get();
        if ($products->isEmpty()) {
            $this->error("No active products available in the database to market.");
            return Command::FAILURE;
        }

        $product = null;
        if ($specific = $this->option('product')) {
            $product = Product::where('slug', $specific)->orWhere('id', $specific)->first();
            if (!$product) {
                $this->error("Specified product '{$specific}' not found.");
                return Command::FAILURE;
            }
        } else {
            // Day-of-year rotation (e.g. Day 1 = Barley, Day 2 = O'Lamour, Day 3 = Coffee, etc.)
            $dayOfYear = (int) now()->format('z');
            $index = $dayOfYear % $products->count();
            $product = $products->values()->get($index);
        }

        $this->info("Selected Product for Today: {$product->name} (Category: {$product->category})");

        // 3. Gather all email recipients from entire database
        $recipients = [];
        if ($testEmail = $this->option('test-email')) {
            $recipients = [strtolower(trim($testEmail))];
            $this->info("Running in TEST MODE. Recipient: {$testEmail}");
        } else {
            $inquiryEmails = Inquiry::pluck('email')->all();
            $regEmails = WorldPlanRegistration::pluck('email')->all();
            $userEmails = User::pluck('email')->all();
            $adminEmails = AdminUser::whereNotNull('email')->pluck('email')->all();

            $merged = array_merge($inquiryEmails, $regEmails, $userEmails, $adminEmails);
            $clean = [];
            foreach ($merged as $em) {
                $em = strtolower(trim((string) $em));
                if (!empty($em) && filter_var($em, FILTER_VALIDATE_EMAIL)) {
                    $clean[$em] = true;
                }
            }

            // Exclude unsubscribes
            $unsubscribes = MarketingUnsubscribe::pluck('email')
                ->map(fn($e) => strtolower(trim((string) $e)))
                ->flip()
                ->all();

            $recipients = array_keys(array_diff_key($clean, $unsubscribes));
        }

        $totalRecipients = count($recipients);
        $this->info("Found {$totalRecipients} valid, eligible recipients across all system tables.");

        if ($totalRecipients === 0) {
            $this->warn("No eligible recipients found to email.");
            return Command::SUCCESS;
        }

        if ($this->option('dry-run')) {
            $this->info("[DRY-RUN] Simulated dispatch of product '{$product->name}' to {$totalRecipients} recipients. No emails were sent.");
            return Command::SUCCESS;
        }

        // 4. Dispatch emails
        $sentCount = 0;
        $failedCount = 0;

        $bar = $this->output->createProgressBar($totalRecipients);
        $bar->start();

        foreach ($recipients as $recipientEmail) {
            $token = hash_hmac('sha256', $recipientEmail, config('app.key'));
            $unsubscribeUrl = url('/unsubscribe?email=' . urlencode($recipientEmail) . '&token=' . $token);

            try {
                Mail::to($recipientEmail)->queue(new ProductMarketingMail(
                    $product,
                    $recipientEmail,
                    $unsubscribeUrl
                ));
                $sentCount++;
            } catch (\Throwable $e) {
                $failedCount++;
                Log::error("Failed to queue marketing email to {$recipientEmail}: " . $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();

        // 5. Record marketing campaign record
        if (!$this->option('test-email')) {
            MarketingCampaign::create([
                'product_id' => $product->id,
                'product_name' => $product->name,
                'subject' => 'Daily Spotlight: ' . $product->name,
                'sent_date' => $today,
                'recipients_count' => $sentCount,
                'status' => 'Dispatched',
                'notes' => "Queued {$sentCount} marketing emails. Failed: {$failedCount}.",
            ]);

            ActivityLog::create([
                'admin_user' => 'System Scheduler',
                'action_type' => 'Daily Marketing Dispatch',
                'device_type' => 'Cron Job',
                'os_browser' => 'CLI / Artisan',
                'ip_address' => '127.0.0.1',
                'status' => 'Success',
                'created_at' => now(),
            ]);
        }

        $this->info("Successfully dispatched daily product marketing for '{$product->name}' to {$sentCount} recipients!");
        return Command::SUCCESS;
    }
}
