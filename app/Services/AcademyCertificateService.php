<?php

namespace App\Services;

use App\Http\Controllers\RealtimeController;
use App\Mail\AcademyCertificateConferredMail;
use App\Models\AcademyCertificate;
use App\Models\AcademyMember;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AcademyCertificateService
{
    /**
     * Check if a member completed all trainings for current rank and generate certificate if not already issued.
     */
    public function ensureTrainingCompletionCertificate(AcademyMember $member): ?AcademyCertificate
    {
        $rank = $member->rank_tier ?? 'Rookie';
        $stats = $member->training_stats;

        // Must be 100% completed and have at least 1 training
        if ($stats['total'] === 0 || $stats['percentage'] < 100) {
            return null;
        }

        $existing = AcademyCertificate::where('member_id', $member->id)
            ->where('rank_tier', $rank)
            ->where('certificate_type', 'training')
            ->first();

        if ($existing) {
            return $existing;
        }

        // Generate unique certificate number
        $year = now()->format('Y');
        $cleanRank = strtoupper(str_replace(' ', '', $rank));
        $certNum = "LCAC-{$cleanRank}-" . str_pad((string) $member->id, 5, '0', STR_PAD_LEFT) . "-{$year}";

        $cert = AcademyCertificate::create([
            'member_id' => $member->id,
            'rank_tier' => $rank,
            'certificate_type' => 'training',
            'certificate_number' => $certNum,
            'issued_at' => now(),
            'template_design' => 'classic-gold',
        ]);

        // Bust realtime snapshot cache immediately
        RealtimeController::flushAcademyCache();

        // Send email with certificate attached
        $this->sendCertificateEmail($cert);

        return $cert;
    }

    /**
     * Issue or replace with a custom edited certificate provided by the Administrator.
     */
    public function issueOrUpdateCustomCertificate(AcademyMember $member, $file, ?string $rank = null): AcademyCertificate
    {
        $rank = $rank ?? ($member->rank_tier ?? 'Rookie');
        $year = now()->format('Y');
        $cleanRank = strtoupper(str_replace(' ', '', $rank));
        $certNum = "LCAC-{$cleanRank}-" . str_pad((string) $member->id, 5, '0', STR_PAD_LEFT) . "-{$year}";

        // Store file in public storage disk under academy_certificates
        $ext = strtolower($file->getClientOriginalExtension() ?: 'pdf');
        $filename = "cert_{$member->id}_{$cleanRank}_" . time() . '.' . $ext;
        $path = $file->storeAs('academy_certificates', $filename, 'public');

        $cert = AcademyCertificate::updateOrCreate(
            [
                'member_id' => $member->id,
                'rank_tier' => $rank,
                'certificate_type' => 'training',
            ],
            [
                'certificate_number' => $certNum,
                'issued_at' => now(),
                'template_design' => 'custom-admin-provided',
                'file_path' => $path,
            ]
        );

        // Bust realtime snapshot cache immediately
        RealtimeController::flushAcademyCache();

        // Send email to member with custom certificate attached
        $this->sendCertificateEmail($cert);

        return $cert;
    }

    /**
     * Dispatch email to member with their official certificate attached.
     */
    public function sendCertificateEmail(AcademyCertificate $certificate): void
    {
        try {
            $member = $certificate->member;
            if ($member && !empty($member->email)) {
                Mail::to($member->email)->send(new AcademyCertificateConferredMail($member, $certificate));
            }
        } catch (\Throwable $e) {
            Log::error("Failed sending certificate email to member #{$certificate->member_id}: " . $e->getMessage());
        }
    }

    /**
     * Generate PDF stream or download for a certificate.
     */
    public function generatePdf(AcademyCertificate $certificate): \Barryvdh\DomPDF\PDF
    {
        $member = $certificate->member;
        $rank = $certificate->rank_tier ?? 'Rookie';

        // Load new transparent white logo (crisp on dark navy certificate) as base64 for reliable DomPDF rendering
        $logoPath = public_path('assets/image/academy/logo-white-trimmed.png');
        if (!file_exists($logoPath)) {
            $logoPath = public_path('assets/image/academy/logo-black-trimmed.png');
        }
        $logoBase64 = file_exists($logoPath) ? 'data:image/png;base64,' . base64_encode(file_get_contents($logoPath)) : null;

        // Load rank badge as base64
        $rankSlug = Str::slug($rank);
        $badgePath = public_path("assets/image/academy/badge-{$rankSlug}.png");
        $badgeBase64 = file_exists($badgePath) ? 'data:image/png;base64,' . base64_encode(file_get_contents($badgePath)) : null;

        $rankThemes = [
            'Rookie' => [
                'color' => '#cbd5e1',
                'gold' => '#f59e0b',
                'stars' => '★',
                'stars_count' => 1,
                'title' => 'Ascending Mountaineer',
            ],
            'Elite' => [
                'color' => '#38bdf8',
                'gold' => '#f59e0b',
                'stars' => '★★',
                'stars_count' => 2,
                'title' => 'High-Performance Pioneer',
            ],
            'Master' => [
                'color' => '#fbbf24',
                'gold' => '#f59e0b',
                'stars' => '★★★',
                'stars_count' => 3,
                'title' => 'Elite Lionheart Member',
            ],
            'Grand Master' => [
                'color' => '#c084fc',
                'gold' => '#f59e0b',
                'stars' => '★★★★',
                'stars_count' => 4,
                'title' => 'Distinguished Champion',
            ],
            'Legend' => [
                'color' => '#f87171',
                'gold' => '#f59e0b',
                'stars' => '★★★★★',
                'stars_count' => 5,
                'title' => 'Supreme Sovereign Member',
            ],
        ];

        $theme = $rankThemes[$rank] ?? $rankThemes['Rookie'];

        $data = [
            'certificate' => $certificate,
            'member' => $member,
            'rank' => $rank,
            'theme' => $theme,
            'certificateNumber' => $certificate->certificate_number,
            'issuedDate' => $certificate->issued_at ? $certificate->issued_at->format('F d, Y') : now()->format('F d, Y'),
            'logoBase64' => $logoBase64,
            'badgeBase64' => $badgeBase64,
        ];

        $pdf = Pdf::loadView('certificates.academy_training_completion', $data);
        $pdf->setPaper('a4', 'landscape');
        $pdf->setOption(['isRemoteEnabled' => true, 'isHtml5ParserEnabled' => true]);

        return $pdf;
    }
}
