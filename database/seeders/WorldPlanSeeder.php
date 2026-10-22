<?php

namespace Database\Seeders;

use App\Models\Inquiry;
use App\Models\WorldPlanRegistration;
use Illuminate\Database\Seeder;

class WorldPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $members = [
            [
                'username' => 'diamond_leader_1',
                'email' => 'alex.kabore@example.com',
                'first_name' => 'Alexandre',
                'middle_name' => 'T.',
                'last_name' => 'Kaboré',
                'birthdate' => '1988-04-12',
                'contact_no' => '+226 70 12 34 56',
                'address' => 'Ouagadougou, Burkina Faso',
                'package_type' => 'exec-diamond',
                'payment_date' => '2026-01-15',
                'payment_proof' => '1788434057_6756f5f2cb.jpg',
                'status' => 'Approved',
            ],
            [
                'username' => 'sapphire_leader_1',
                'email' => 'marie.diallo@example.com',
                'first_name' => 'Marie',
                'middle_name' => 'K.',
                'last_name' => 'Diallo',
                'birthdate' => '1992-09-21',
                'contact_no' => '+225 07 45 67 89',
                'address' => 'Abidjan, Côte d\'Ivoire',
                'package_type' => 'exec-sapphire',
                'payment_date' => '2026-02-10',
                'payment_proof' => '1792665754_30b7ef2a22f6.png',
                'status' => 'Approved',
            ],
            [
                'username' => 'ruby_leader_1',
                'email' => 'jean.nguema@example.com',
                'first_name' => 'Jean-Paul',
                'middle_name' => 'B.',
                'last_name' => 'Nguema',
                'birthdate' => '1990-11-05',
                'contact_no' => '+237 67 89 01 23',
                'address' => 'Douala, Cameroon',
                'package_type' => 'exec-ruby',
                'payment_date' => '2026-03-01',
                'payment_proof' => '1788434057_6756f5f2cb.jpg',
                'status' => 'Approved',
            ],
            [
                'username' => 'pearl_leader_1',
                'email' => 'solomon.png@example.com',
                'first_name' => 'Solomon',
                'middle_name' => 'M.',
                'last_name' => 'Waima',
                'birthdate' => '1995-06-18',
                'contact_no' => '+675 7123 4567',
                'address' => 'Port Moresby, Papua New Guinea',
                'package_type' => 'exec-pearl',
                'payment_date' => '2026-03-20',
                'payment_proof' => '1792665754_30b7ef2a22f6.png',
                'status' => 'Approved',
            ],
            [
                'username' => 'pending_applicant_1',
                'email' => 'grace.omondi@example.com',
                'first_name' => 'Grace',
                'middle_name' => 'A.',
                'last_name' => 'Omondi',
                'birthdate' => '1994-08-30',
                'contact_no' => '+256 77 123 4567',
                'address' => 'Kampala, Uganda',
                'package_type' => 'exec-ruby',
                'payment_date' => '2026-10-18',
                'payment_proof' => '1788434057_6756f5f2cb.jpg',
                'status' => 'Pending',
            ],
        ];

        foreach ($members as $member) {
            WorldPlanRegistration::updateOrCreate(
                ['username' => $member['username']],
                $member
            );
        }

        // Sample initial inquiries
        $inquiries = [
            [
                'name' => 'David Lawson',
                'email' => 'david.lawson@example.com',
                'subject' => 'Order Barley',
                'message' => 'I would like to purchase 5 boxes of Infinite Barley for our wellness center.',
                'is_read' => false,
            ],
            [
                'name' => 'Aminata Koné',
                'email' => 'aminata.k@example.com',
                'subject' => 'Join Us',
                'message' => 'Hello! How do I register as a diamond distributor in Abidjan?',
                'is_read' => true,
            ],
            [
                'name' => 'Carlos Mendoza',
                'email' => 'carlos.m@example.com',
                'subject' => 'Order Product',
                'message' => 'Interested in bulk pricing for O\'Lamour skincare sets for our beauty clinic.',
                'is_read' => false,
            ],
        ];

        foreach ($inquiries as $inq) {
            Inquiry::firstOrCreate(
                ['email' => $inq['email'], 'subject' => $inq['subject']],
                $inq
            );
        }
    }
}
