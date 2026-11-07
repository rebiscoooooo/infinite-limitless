<?php

namespace App\Http\Controllers;

use App\Models\MarketingUnsubscribe;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MarketingController extends Controller
{
    /**
     * Unsubscribe an email from daily marketing spotlights.
     */
    public function unsubscribe(Request $request): Response
    {
        $email = strtolower(trim((string) $request->query('email')));
        $token = (string) $request->query('token');

        $isValid = false;
        if (!empty($email) && !empty($token)) {
            $expectedToken = hash_hmac('sha256', $email, config('app.key'));
            $isValid = hash_equals($expectedToken, $token);
        }

        if ($isValid) {
            MarketingUnsubscribe::updateOrCreate(
                ['email' => $email],
                [
                    'reason' => 'User requested via unsubscribe link',
                    'unsubscribed_at' => now(),
                ]
            );
        }

        return response()->view('emails.unsubscribed', [
            'email' => $email,
            'isValid' => $isValid,
        ]);
    }
}

