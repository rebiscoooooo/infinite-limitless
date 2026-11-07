<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInquiryRequest;
use App\Mail\InquiryConfirmationUserMail;
use App\Mail\InquiryReceivedAdminMail;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;

class InquiryController extends Controller
{
    /**
     * Store incoming website inquiry and dispatch queued emails.
     */
    public function store(StoreInquiryRequest $request): JsonResponse|RedirectResponse
    {
        $inquiry = Inquiry::create($request->validated());

        // Send notifications to admin and inquirer
        try {
            $adminEmail = config('mail.admin_address', env('ADMIN_EMAIL', 'infinitelimitless123@gmail.com'));
            Mail::to($adminEmail)->queue(new InquiryReceivedAdminMail($inquiry));
            Mail::to($inquiry->email)->queue(new InquiryConfirmationUserMail($inquiry));
        } catch (\Throwable $e) {
            \Illuminate\Support\Facades\Log::error("Failed to send inquiry emails for #{$inquiry->id}: " . $e->getMessage());
            report($e);
        }

        if ($request->wantsJson()) {
            return response()->json([
                'status' => 'success',
                'message' => 'Your inquiry has been sent. Our team will get back to you shortly.',
                'inquiry' => $inquiry,
            ]);
        }

        return redirect()->back()->with('success', 'Your inquiry has been sent. Our team will get back to you shortly.');
    }
}
