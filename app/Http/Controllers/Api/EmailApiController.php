<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\InquiryConfirmationUserMail;
use App\Mail\InquiryReceivedAdminMail;
use App\Mail\InquiryReplyMail;
use App\Mail\WorldPlanReceivedAdminMail;
use App\Mail\WorldPlanReceivedConfirmationMail;
use App\Mail\WorldPlanStatusUpdatedMail;
use App\Models\ActivityLog;
use App\Models\Inquiry;
use App\Models\MemberRegistration;
use App\Models\WorldPlanRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class EmailApiController extends Controller
{
    /**
     * Submit a website inquiry (REST API & legacy compatible).
     * Endpoint: POST /api/inquiries, POST /backend/submit_inquiry.php, POST /backend/send_contact.php
     */
    public function submitInquiry(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ], [
            'name.required' => 'Please fill out your name.',
            'email.required' => 'Please provide a valid email address.',
            'subject.required' => 'Please provide a subject for your inquiry.',
            'message.required' => 'Please write your message.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $inquiry = Inquiry::create([
            'name' => trim(strip_tags($request->input('name'))),
            'email' => filter_var(trim($request->input('email')), FILTER_SANITIZE_EMAIL),
            'subject' => trim(strip_tags($request->input('subject'))),
            'message' => trim($request->input('message')),
            'is_read' => false,
        ]);

        $adminEmail = config('mail.admin_address', env('ADMIN_EMAIL', 'infinitelimitless123@gmail.com'));
        $emailsDispatched = [];
        $emailErrors = [];

        // 1. Notify Admin
        try {
            Mail::to($adminEmail)->queue(new InquiryReceivedAdminMail($inquiry));
            $emailsDispatched[] = 'admin';
        } catch (\Throwable $e) {
            $emailErrors['admin'] = $e->getMessage();
            Log::error("Failed sending admin inquiry email notification: " . $e->getMessage());
        }

        // 2. Send Confirmation to User
        try {
            Mail::to($inquiry->email)->queue(new InquiryConfirmationUserMail($inquiry));
            $emailsDispatched[] = 'user_confirmation';
        } catch (\Throwable $e) {
            $emailErrors['user'] = $e->getMessage();
            Log::error("Failed sending user confirmation email to {$inquiry->email}: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Your inquiry has been sent successfully. A confirmation receipt has been emailed to you.',
            'inquiry_id' => $inquiry->id,
            'emails_dispatched' => $emailsDispatched,
            'email_errors' => $emailErrors ?: null,
        ]);
    }

    /**
     * Send email reply to an inquiry (REST API & legacy compatible).
     * Endpoint: POST /api/inquiries/{inquiry?}/reply, POST /backend/api_send_reply.php
     */
    public function sendReply(Request $request, ?int $inquiryId = null): JsonResponse
    {
        $id = $inquiryId ?: $request->input('inquiry_id') ?: $request->input('id');
        $recipientEmail = $request->input('recipient_email') ?: $request->input('email');
        $replySubject = $request->input('reply_subject') ?: $request->input('subject');
        $replyMessage = $request->input('reply_message') ?: $request->input('message');

        $inquiry = null;
        if ($id) {
            $inquiry = Inquiry::find($id);
        } elseif ($recipientEmail) {
            $inquiry = Inquiry::where('email', $recipientEmail)->latest()->first();
        }

        if (!$inquiry && !$recipientEmail) {
            return response()->json([
                'status' => 'error',
                'message' => 'Target inquiry or recipient email address is required.',
            ], 422);
        }

        if (empty($replySubject) || empty($replyMessage)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Subject and reply message cannot be empty.',
            ], 422);
        }

        // Create temporary inquiry instance if responding directly by email
        if (!$inquiry) {
            $inquiry = new Inquiry([
                'name' => $request->input('recipient_name') ?: 'Valued Client',
                'email' => $recipientEmail,
                'subject' => $replySubject,
                'message' => 'Direct Admin Communication',
                'is_read' => true,
            ]);
        }

        try {
            Mail::to($inquiry->email)->queue(new InquiryReplyMail($inquiry, $replySubject, $replyMessage));

            if ($inquiry->exists) {
                $inquiry->update(['is_read' => true]);
            }

            ActivityLog::create([
                'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin (API)',
                'action_type' => "Sent Reply to {$inquiry->email}",
                'device_type' => 'API / Portal',
                'os_browser' => $request->userAgent() ?? '',
                'ip_address' => $request->ip() ?? '127.0.0.1',
                'status' => 'Success',
                'created_at' => now(),
            ]);

            return response()->json([
                'status' => 'success',
                'message' => "Reply successfully sent to {$inquiry->email}!",
            ]);
        } catch (\Throwable $e) {
            Log::error("API Reply Mail Error to {$inquiry->email}: " . $e->getMessage());

            ActivityLog::create([
                'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin (API)',
                'action_type' => "Failed to Send Reply to {$inquiry->email}",
                'device_type' => 'API / Portal',
                'os_browser' => $request->userAgent() ?? '',
                'ip_address' => $request->ip() ?? '127.0.0.1',
                'status' => 'Failed',
                'created_at' => now(),
            ]);

            return response()->json([
                'status' => 'error',
                'message' => "Email delivery failed: " . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Submit World Plan Registration (REST API & legacy compatible).
     * Endpoint: POST /api/world-plan/registrations, POST /backend/submit_world_registration.php, POST /backend/submit_world_plan.php
     */
    public function submitWorldRegistration(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:3|max:50|unique:world_plan_registrations,username',
            'email' => 'required|email|max:255|unique:world_plan_registrations,email',
            'firstName' => 'required_without:first_name|string|max:100',
            'first_name' => 'required_without:firstName|string|max:100',
            'middleName' => 'nullable|string|max:100',
            'middle_name' => 'nullable|string|max:100',
            'lastName' => 'required_without:last_name|string|max:100',
            'last_name' => 'required_without:lastName|string|max:100',
            'birthdate' => 'required|date',
            'contact' => 'required_without:contact_no|string|max:50',
            'contact_no' => 'required_without:contact|string|max:50',
            'address' => 'required|string|max:1000',
            'packageType' => 'required_without:package_type|string|max:100',
            'package_type' => 'required_without:packageType|string|max:100',
            'paymentDate' => 'required_without:payment_date|date',
            'payment_date' => 'required_without:paymentDate|date',
            'paymentProof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:10240',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors()->first(),
                'errors' => $validator->errors(),
            ], 422);
        }

        $proofPath = '';
        if ($request->hasFile('paymentProof')) {
            $file = $request->file('paymentProof');
            $extension = $file->getClientOriginalExtension();
            $fileName = time() . '_' . bin2hex(random_bytes(6)) . '.' . $extension;
            $file->storeAs('payment_proofs', $fileName, 'public');
            $proofPath = $fileName;
        }

        $registration = WorldPlanRegistration::create([
            'username' => $request->input('username'),
            'email' => $request->input('email'),
            'first_name' => $request->input('firstName', $request->input('first_name')),
            'middle_name' => $request->input('middleName', $request->input('middle_name')),
            'last_name' => $request->input('lastName', $request->input('last_name')),
            'birthdate' => $request->input('birthdate'),
            'contact_no' => $request->input('contact', $request->input('contact_no')),
            'address' => $request->input('address'),
            'country' => $request->input('country', 'Philippines'),
            'sponsor' => $request->input('sponsor'),
            'package_type' => $request->input('packageType', $request->input('package_type')),
            'product_set' => $request->input('productSet', $request->input('product_set')),
            'payment_method' => $request->input('paymentMethod', $request->input('payment_method')),
            'amount_paid' => $request->input('amountPaid', $request->input('amount_paid')),
            'payment_date' => $request->input('paymentDate', $request->input('payment_date')),
            'payment_proof' => $proofPath,
            'status' => 'Pending',
            'agreed_terms' => 'Yes',
            'agreed_terms_at' => now(),
            'edit_token' => \Illuminate\Support\Str::random(40),
        ]);

        $adminEmail = config('mail.admin_address', env('ADMIN_EMAIL', 'infinitelimitless123@gmail.com'));
        $emailsDispatched = [];

        try {
            Mail::to($adminEmail)->queue(new WorldPlanReceivedAdminMail($registration));
            $emailsDispatched[] = 'admin_notification';
        } catch (\Throwable $e) {
            Log::error("World Plan admin email failed for #{$registration->id}: " . $e->getMessage());
        }

        try {
            Mail::to($registration->email)->queue(new WorldPlanReceivedConfirmationMail($registration));
            $emailsDispatched[] = 'user_confirmation';
        } catch (\Throwable $e) {
            Log::error("World Plan confirmation email failed for #{$registration->id}: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => 'World Plan registration submitted successfully and pending verification.',
            'registration' => $registration,
            'emails_dispatched' => $emailsDispatched,
        ]);
    }

    /**
     * Update World Plan Registration status & send confirmation email.
     * Endpoint: POST /api/world-plan/registrations/{registration?}/status, POST /backend/api_update_world_plan_status.php
     */
    public function updateWorldPlanStatus(Request $request, ?int $registrationId = null): JsonResponse
    {
        $id = $registrationId ?: $request->input('id');
        $status = $request->input('status');

        if (!$id || !in_array($status, ['Approved', 'Rejected', 'Pending'])) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid parameters. Please provide a valid registration id and status (Approved or Rejected).',
            ], 422);
        }

        $registration = WorldPlanRegistration::find($id);
        if (!$registration) {
            return response()->json([
                'status' => 'error',
                'message' => "Registration #{$id} not found.",
            ], 404);
        }

        $oldStatus = $registration->status;
        $registration->update(['status' => $status]);

        $mailSent = false;
        $mailError = null;

        if ($oldStatus !== $status && in_array($status, ['Approved', 'Rejected'])) {
            try {
                Mail::to($registration->email)->queue(new WorldPlanStatusUpdatedMail($registration));
                $mailSent = true;
            } catch (\Throwable $e) {
                $mailError = $e->getMessage();
                Log::error("Failed to send status email to {$registration->email}: " . $mailError);
            }
        }

        ActivityLog::create([
            'admin_user' => Auth::guard('admin')->user()?->username ?? 'Admin (API)',
            'action_type' => "Updated Registration #{$id} Status to {$status}" . ($mailSent ? ' (Email Sent)' : ''),
            'device_type' => 'API / Portal',
            'os_browser' => $request->userAgent() ?? '',
            'ip_address' => $request->ip() ?? '127.0.0.1',
            'status' => 'Success',
            'created_at' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => "Status for {$registration->full_name} updated to {$status}." . ($mailSent ? " Confirmation email sent to {$registration->email}." : ($mailError ? " (Email error: {$mailError})" : "")),
            'registration' => $registration,
            'email_sent' => $mailSent,
            'email_error' => $mailError,
        ]);
    }

    /**
     * Update legacy MemberRegistration status (backward compatibility).
     * Endpoint: POST /backend/api_update_reg_status.php
     */
    public function updateMemberRegistrationStatus(Request $request): JsonResponse
    {
        $id = $request->input('id');
        $status = $request->input('status');

        if (!$id || !in_array($status, ['Approved', 'Rejected'])) {
            return response()->json(['status' => 'error', 'message' => 'Invalid parameters.'], 422);
        }

        $member = MemberRegistration::find($id);
        if (!$member) {
            return response()->json(['status' => 'error', 'message' => 'Member registration not found.'], 404);
        }

        $member->update(['status' => $status]);

        // Send confirmation email
        $mailSent = false;
        try {
            Mail::send([], [], function ($message) use ($member, $status) {
                $subject = $status === 'Approved'
                    ? 'Application Approved - Welcome to Infinite!'
                    : 'Update on your Infinite Pre-Registration';

                $message->to($member->email, $member->full_name)
                    ->subject($subject)
                    ->html("
                        <div style='font-family: Arial, sans-serif; padding: 25px; color: #0f172a;'>
                            <h2>Hello {$member->full_name},</h2>
                            <p>Your Infinite Pre-Registration status has been updated to: <strong>{$status}</strong>.</p>
                            <p>Our team will contact you shortly regarding the next steps.</p>
                            <br>
                            <p>Best Regards,<br><strong>INFINITE Meraki Nation</strong></p>
                        </div>
                    ");
            });
            $mailSent = true;
        } catch (\Throwable $e) {
            Log::error("Failed to send member reg email to {$member->email}: " . $e->getMessage());
        }

        return response()->json([
            'status' => 'success',
            'message' => "Member registration status updated to {$status}.",
            'email_sent' => $mailSent,
        ]);
    }

    /**
     * Diagnostic endpoint to test live SMTP connection.
     * Endpoint: POST /api/mail/test, POST /admin/test-email
     */
    public function testEmail(Request $request): JsonResponse
    {
        $targetEmail = $request->input('recipient') ?: config('mail.admin_address', env('ADMIN_EMAIL', 'infinitelimitless123@gmail.com'));

        try {
            Mail::raw("This is a verified test email sent from the Infinite Limitless Backend system at " . now()->toRfc2822String() . ".\n\nSMTP Host: " . config('mail.mailers.smtp.host') . "\nSMTP Port: " . config('mail.mailers.smtp.port') . "\nFrom: " . config('mail.from.address'), function ($msg) use ($targetEmail) {
                $msg->to($targetEmail)
                    ->subject("INFINITE System - SMTP Diagnostic Test [" . now()->format('Y-m-d H:i:s') . "]");
            });

            return response()->json([
                'status' => 'success',
                'message' => "Test email dispatched successfully to {$targetEmail}.",
                'diagnostics' => [
                    'mailer' => config('mail.default'),
                    'smtp_host' => config('mail.mailers.smtp.host'),
                    'smtp_port' => config('mail.mailers.smtp.port'),
                    'encryption' => config('mail.mailers.smtp.encryption'),
                    'from' => config('mail.from.address'),
                    'recipient' => $targetEmail,
                    'timestamp' => now()->toIso8601String(),
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => "SMTP Test Failed: " . $e->getMessage(),
                'trace' => $e->getMessage(),
            ], 500);
        }
    }
}
