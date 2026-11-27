<?php

namespace Database\Seeders;

use App\Models\AcademyMember;
use App\Models\AcademyRankRequirement;
use App\Models\AcademyTraining;
use Illuminate\Database\Seeder;

class AcademyCurriculumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedRankRequirements();
        $this->seedRankTrainings();
        $this->initializeExistingMembers();
    }

    private function seedRankRequirements(): void
    {
        $requirements = [
            // ROOKIE
            [
                'rank_tier' => 'Rookie',
                'code' => 'ROOKIE-REQ-1',
                'title_en' => '3 Personal Sponsors',
                'title_tl' => '3 Personal na Sponsor',
                'description_en' => 'Directly sponsor and onboard 3 new active members into the Legacy Club Academy.',
                'description_tl' => 'Direktang mag-sponsor at mag-onboard ng 3 bagong aktibong miyembro sa Legacy Club Academy.',
                'target_value' => 3,
                'unit' => 'Personal Sponsors',
                'order' => 1,
            ],
            [
                'rank_tier' => 'Rookie',
                'code' => 'ROOKIE-REQ-2',
                'title_en' => 'Orientation & Academy Onboarding',
                'title_tl' => 'Oryentasyon at Onboarding sa Academy',
                'description_en' => 'Attend and complete the official Academy Welcome Orientation and code of ethics agreement.',
                'description_tl' => 'Dumalo at tapusin ang opisyal na Oryentasyon ng Academy at lumagda sa code of ethics.',
                'target_value' => 1,
                'unit' => 'Milestone',
                'order' => 2,
            ],
            [
                'rank_tier' => 'Rookie',
                'code' => 'ROOKIE-REQ-3',
                'title_en' => '10 Product Knowledge Shares',
                'title_tl' => '10 Pagbabahagi ng Kaalaman sa Produkto',
                'description_en' => 'Share and present the official Infinite products (Barley, Olamour) to at least 10 qualified prospects.',
                'description_tl' => 'Ibahagi at ipaliwanag ang mga opisyal na produkto ng Infinite sa di bababa sa 10 kwalipikadong prospek.',
                'target_value' => 10,
                'unit' => 'Product Shares',
                'order' => 3,
            ],

            // ELITE
            [
                'rank_tier' => 'Elite',
                'code' => 'ELITE-REQ-1',
                'title_en' => '6 Personal Sponsors',
                'title_tl' => '6 Personal na Sponsor',
                'description_en' => 'Expand your personal network to 6 directly sponsored verified members.',
                'description_tl' => 'Palawakin ang personal na grupo sa 6 na direktang na-sponsor na beripikadong miyembro.',
                'target_value' => 6,
                'unit' => 'Personal Sponsors',
                'order' => 1,
            ],
            [
                'rank_tier' => 'Elite',
                'code' => 'ELITE-REQ-2',
                'title_en' => '2 Active Rookie Leaders',
                'title_tl' => '2 Aktibong Rookie Leaders',
                'description_en' => 'Guide and empower 2 directly sponsored members to actively work their Rookie requirements.',
                'description_tl' => 'Gabayan ang 2 direktang miyembro upang aktibong magampanan ang kanilang Rookie requirements.',
                'target_value' => 2,
                'unit' => 'Rookie Leaders',
                'order' => 2,
            ],
            [
                'rank_tier' => 'Elite',
                'code' => 'ELITE-REQ-3',
                'title_en' => '25 Product Demonstration Sessions',
                'title_tl' => '25 Serye ng Pagpapakita ng Produkto',
                'description_en' => 'Conduct 25 certified product presentations or sample demonstrations.',
                'description_tl' => 'Magsagawa ng 25 sertipikadong presentasyon o pagpapatikim ng produkto sa mga kliyente.',
                'target_value' => 25,
                'unit' => 'Presentations',
                'order' => 3,
            ],

            // MASTER
            [
                'rank_tier' => 'Master',
                'code' => 'MASTER-REQ-1',
                'title_en' => '12 Personal Sponsors',
                'title_tl' => '12 Personal na Sponsor',
                'description_en' => 'Maintain 12 active personal sponsors with verified academy accounts.',
                'description_tl' => 'Panatilihin ang 12 aktibong personal na sponsor na may beripikadong academy account.',
                'target_value' => 12,
                'unit' => 'Personal Sponsors',
                'order' => 1,
            ],
            [
                'rank_tier' => 'Master',
                'code' => 'MASTER-REQ-2',
                'title_en' => '4 Elite Leaders Developed',
                'title_tl' => '4 na Nalinang na Elite Leaders',
                'description_en' => 'Mentor 4 group leaders to achieve the verified rank of Elite.',
                'description_tl' => 'Magturo at gumabay sa 4 na pinuno upang maabot ang beripikadong antas ng Elite.',
                'target_value' => 4,
                'unit' => 'Elite Leaders',
                'order' => 2,
            ],
            [
                'rank_tier' => 'Master',
                'code' => 'MASTER-REQ-3',
                'title_en' => '50 Team Volume Points',
                'title_tl' => '50 Team Volume Points',
                'description_en' => 'Attain an aggregate team volume of 50 qualified distribution cycles.',
                'description_tl' => 'Makaipon ng kabuuang 50 qualified distribution cycles sa buong grupo.',
                'target_value' => 50,
                'unit' => 'Volume Points',
                'order' => 3,
            ],

            // GRAND MASTER
            [
                'rank_tier' => 'Grand Master',
                'code' => 'GM-REQ-1',
                'title_en' => '20 Personal Sponsors',
                'title_tl' => '20 Personal na Sponsor',
                'description_en' => 'Directly sponsor 20 qualified academy associates.',
                'description_tl' => 'Direktang mag-sponsor ng 20 kwalipikadong kasapi sa academy.',
                'target_value' => 20,
                'unit' => 'Personal Sponsors',
                'order' => 1,
            ],
            [
                'rank_tier' => 'Grand Master',
                'code' => 'GM-REQ-2',
                'title_en' => '6 Master Leaders Mentored',
                'title_tl' => '6 na Master Leaders na Ginagabayan',
                'description_en' => 'Develop and nurture 6 active Master rank leaders in your direct organization.',
                'description_tl' => 'Linangin at alalayan ang 6 na aktibong Master rank leaders sa organisasyon.',
                'target_value' => 6,
                'unit' => 'Master Leaders',
                'order' => 2,
            ],
            [
                'rank_tier' => 'Grand Master',
                'code' => 'GM-REQ-3',
                'title_en' => '150 Regional Distribution Volume',
                'title_tl' => '150 Rehiyonal na Volume ng Pamamahagi',
                'description_en' => 'Achieve 150 regional team volume units across multi-branch distribution.',
                'description_tl' => 'Makapagtala ng 150 regional team volume units sa pamamahagi ng produkto.',
                'target_value' => 150,
                'unit' => 'Volume Units',
                'order' => 3,
            ],

            // LEGEND
            [
                'rank_tier' => 'Legend',
                'code' => 'LEGEND-REQ-1',
                'title_en' => '35 Personal Sponsors',
                'title_tl' => '35 Personal na Sponsor',
                'description_en' => 'Directly build an executive network of 35 verified associates.',
                'description_tl' => 'Bumuo ng ehekutibong samahan ng 35 beripikadong kasapi.',
                'target_value' => 35,
                'unit' => 'Personal Sponsors',
                'order' => 1,
            ],
            [
                'rank_tier' => 'Legend',
                'code' => 'LEGEND-REQ-2',
                'title_en' => '10 Grand Master Leaders',
                'title_tl' => '10 Grand Master Leaders',
                'description_en' => 'Empower 10 leaders to achieve Grand Master rank distinction.',
                'description_tl' => 'Tulungan ang 10 pinuno na makamit ang antas ng Grand Master.',
                'target_value' => 10,
                'unit' => 'Grand Master Leaders',
                'order' => 2,
            ],
            [
                'rank_tier' => 'Legend',
                'code' => 'LEGEND-REQ-3',
                'title_en' => '500 Global Council Contributions',
                'title_tl' => '500 Pandaigdigang Kontribusyon sa Konseho',
                'description_en' => 'Deliver 500 strategic global volume units and lead international expansions.',
                'description_tl' => 'Makapaghatid ng 500 global volume units at mamuno sa pandaigdigang pagpapalawak.',
                'target_value' => 500,
                'unit' => 'Global Units',
                'order' => 3,
            ],
        ];

        foreach ($requirements as $req) {
            AcademyRankRequirement::updateOrCreate(
                ['code' => $req['code']],
                $req
            );
        }
    }

    private function seedRankTrainings(): void
    {
        $trainings = [
            // ROOKIE TRAININGS (5 Modules)
            [
                'rank_tier' => 'Rookie',
                'order' => 1,
                'title_en' => 'Foundational Mindset & Academy Onboarding',
                'title_tl' => 'Pundasyon ng Tagumpay at Oryentasyon sa Academy',
                'description_en' => 'Understand the core values, visionary ethos, and ethical standards of Legacy Club Academy.',
                'description_tl' => 'Unawain ang mga pangunahing halaga, layunin, at etikal na pamantayan ng Legacy Club Academy.',
                'content_en' => "Welcome to Module 1 of your Rookie Journey.\n\n### 1. Vision & Purpose\nAt Legacy Club Academy, we believe in limitless human potential. Success starts with a disciplined mindset, unwavering commitment, and a deep understanding of your 'Why'.\n\n### 2. The 3 Core Pillars\n- **Integrity First:** Always present truths, never exaggerate.\n- **Continuous Learning:** Daily skill enhancement produces compound results.\n- **Empowering Others:** Your true success is measured by the growth of people you help.\n\nTake time to internalize these principles and write down your 60-day target.",
                'content_tl' => "Maligayang pagdating sa Modyul 1 ng iyong Paglalakbay bilang Rookie.\n\n### 1. Pananaw at Layunin\nSa Legacy Club Academy, naniniwala kami sa walang-hanggang potensyal ng tao. Ang tagumpay ay nagsisimula sa disiplinadong pag-iisip, matibay na dedikasyon, at malinaw na 'Bakit'.\n\n### 2. Ang Tatlong Haligi\n- **Kalinisan ng Hangarin:** Laging maging totoo at huwag magpalabis.\n- **Tuloy-tuloy na Pag-aaral:** Ang araw-araw na pagpapahusay ay nagdudulot ng malaking tagumpay.\n- **Pagtulong sa Kapwa:** Ang tunay na tagumpay ay nasusukat sa pag-angat ng mga tinutulungan mo.",
                'duration_minutes' => 30,
                'reflection_prompt_en' => 'What is your primary "Why" for joining the Academy, and how will you apply the 3 Core Pillars in your first 30 days?',
                'reflection_prompt_tl' => 'Ano ang iyong pangunahing "Bakit" sa pagsali sa Academy, at paano mo isasabuhay ang Tatlong Haligi sa iyong unang 30 araw?',
            ],
            [
                'rank_tier' => 'Rookie',
                'order' => 2,
                'title_en' => 'Understanding Products & Core Solutions',
                'title_tl' => 'Kaalaman sa Produkto at Solusyon',
                'description_en' => 'Deep dive into Infinite Organic Barley, O\'Lamour Luxury Skincare, and wellness benefits.',
                'description_tl' => 'Masusing pag-aaral sa Infinite Organic Barley, O\'Lamour Skincare, at mga benepisyo sa kalusugan.',
                'content_en' => "### Module 2: Product Mastery\n\nA true professional is a product of the product.\n\n- **Infinite Organic Barley:** High-potency chlorophyll, essential vitamins, natural alkalinity, antioxidant power.\n- **O'Lamour Skincare Series:** Anti-aging peptides, deep cellular nourishment, radiant natural glow.\n- **Value Proposition:** Selling through authentic personal testimonies rather than pushy sales scripts.",
                'content_tl' => "### Modyul 2: Pagsasanay sa Produkto\n\nAng isang tunay na propesyonal ay gumagamit at nagtitiwala sa sariling produkto.\n\n- **Infinite Organic Barley:** Mayaman sa chlorophyll, bitamina, natural na alkalinity, at antioxidants.\n- **O'Lamour Skincare:** Pampa-bata, pampalusog ng balat, at nagbibigay ng natural na ningning.\n- **Paraan ng Pag-alok:** Ibahagi ang totoong karanasan at benepisyo sa halip na mamilit.",
                'duration_minutes' => 45,
                'reflection_prompt_en' => 'Share your personal experience with our core products and how you will effectively communicate their health benefits to others.',
                'reflection_prompt_tl' => 'Ibahagi ang iyong personal na karanasan sa ating mga produkto at kung paano mo ipaliliwanag ang mga benepisyo nito sa iba.',
            ],
            [
                'rank_tier' => 'Rookie',
                'order' => 3,
                'title_en' => 'Effective Prospecting & Connection',
                'title_tl' => 'Epektibong Pakikipag-ugnayan at Paghahanap ng Prospek',
                'description_en' => 'Master the art of sincere conversations, relationship building, and identifying needs.',
                'description_tl' => 'Maging bihasa sa tapat na pakikipag-usap, pagbuo ng relasyon, at pag-alam sa pangangailangan ng iba.',
                'content_en' => "### Module 3: Building Genuine Relationships\n\nProspecting is not about hunting; it is about sorting and serving.\n\n1. **The FORD Technique:** Family, Occupation, Recreation, Dreams.\n2. **Active Listening:** Listen 70% of the time, speak 30%.\n3. **Problem-Solution Mapping:** Discover what keeps them awake at night and offer the Academy or Products as genuine relief.",
                'content_tl' => "### Modyul 3: Pagbuo ng Tunay na Ugnayan\n\nAng paghahanap ng kasosyo ay hindi panghuhuli; ito ay pagtulong at pag-alam sa karapat-dapat.\n\n1. **FORD Technique:** Pamilya, Trabaho, Libangan, Pangarap.\n2. **Makinig nang Mabuti:** 70% makinig, 30% lamang magsalita.\n3. **Pag-alok ng Solusyon:** Alamin ang kanilang suliranin at ialok ang tulong ng Academy at Produkto.",
                'duration_minutes' => 40,
                'reflection_prompt_en' => 'Identify 5 prospects you will reach out to using the FORD technique and outline the questions you will ask to discover their needs.',
                'reflection_prompt_tl' => 'Pumili ng 5 taong kakausapin gamit ang FORD technique at isulat ang mga tanong na iyong gagamitin upang malaman ang kanilang pangangailangan.',
            ],
            [
                'rank_tier' => 'Rookie',
                'order' => 4,
                'title_en' => 'The 60-Day Momentum Blueprint',
                'title_tl' => 'Ang 60-Araw na Plano para sa Tagumpay',
                'description_en' => 'Structured daily habits, scheduling, and consistent activity cycles for your 60-day program.',
                'description_tl' => 'Mga pang-araw-araw na gawi, pag-iiskedyul, at tuloy-tuloy na pagkilos para sa 60-araw na programa.',
                'content_en' => "### Module 4: The 60-Day Development Cycle\n\nEvery day in your 60-day development cycle counts.\n\n- **Daily Non-Negotiables:** 3 new connections, 1 product follow-up, 20 minutes of study.\n- **Weekly Review:** Analyze what worked, eliminate distractions, consult your mentor.\n- **Pacing:** Aim to complete your 3 personal sponsors before Day 45 to finish ahead of schedule.",
                'content_tl' => "### Modyul 4: Ang 60-Araw na Pagpapalago\n\nBawat araw sa iyong 60-araw na programa ay may halaga.\n\n- **Araw-araw na Gawain:** 3 bagong kakausapin, 1 follow-up sa produkto, 20 minutong pagbabasa.\n- **Lingguhang Pagsusuri:** Tingnan kung ano ang naging epektibo at alisin ang mga sagabal.\n- **Tiyempo:** Sikaping makuha ang 3 personal sponsors bago ang Day 45 upang matapos nang maaga.",
                'duration_minutes' => 35,
                'reflection_prompt_en' => 'Draft your weekly time-blocking schedule and commit to your 3 daily non-negotiable activities for the 60-day cycle.',
                'reflection_prompt_tl' => 'Gawin ang iyong lingguhang iskedyul ng oras at mangako sa iyong 3 araw-araw na gawain para sa 60-araw na siklo.',
            ],
            [
                'rank_tier' => 'Rookie',
                'order' => 5,
                'title_en' => 'Leadership Ethics & Compliance',
                'title_tl' => 'Etika sa Pamumuno at Pagsunod sa Alituntunin',
                'description_en' => 'Protect the Academy reputation, adhere to fair compensation practices, and honor commitments.',
                'description_tl' => 'Pangalagaan ang reputasyon ng Academy, sumunod sa patas na patakaran, at tuparin ang mga pangako.',
                'content_en' => "### Module 5: Professional Leadership & Ethics\n\nLong-term legacy requires bulletproof ethics.\n\n- **No Cross-Recruiting:** Respect each member's organization.\n- **Zero Income Guarantees:** Never promise easy money or passive get-rich schemes.\n- **Mentorship Responsibility:** Once you sponsor someone, guide them with patience and dedication.\n\nPassing this module qualifies you for the official Rookie Training Completion Certificate upon administrative review.",
                'content_tl' => "### Modyul 5: Propesyonal na Pamumuno at Etika\n\nAng pangmatagalang pamana ay nangangailangan ng malinis na etika.\n\n- **Igalang ang Ibang Grupo:** Huwag mag-sulot o manghimasok sa ibang miyembro.\n- **Walang Maling Pangako:** Huwag mangako ng agarang yaman nang walang pagsisikap.\n- **Responsibilidad sa Tinulungan:** Kapag may naipasok kang miyembro, tulungan at gabayan sila nang buong puso.\n\nAng pagtatapos dito ay magbibigay sa iyo ng Certificate of Training Completion pagkatapos maaprubahan ng admin.",
                'duration_minutes' => 45,
                'reflection_prompt_en' => 'What ethical commitments do you make to your future team members, and how will you safeguard the integrity of the Legacy Club brand?',
                'reflection_prompt_tl' => 'Anong mga etikal na pangako ang iyong bibitawan sa iyong magiging grupo, at paano mo poprotektahan ang magandang pangalan ng Legacy Club?',
            ],

            // ELITE TRAININGS (5 Modules)
            [
                'rank_tier' => 'Elite',
                'order' => 1,
                'title_en' => 'Advanced Presentation & Conversion Mastery',
                'title_tl' => 'Mastery sa Pagpapaliwanag at Paghikayat',
                'description_en' => 'Elevate your communication to inspire action and handle objections with finesse.',
                'description_tl' => 'Itaas ang antas ng komunikasyon upang magbigay-inspirasyon at sumagot sa mga pag-aalinlangan nang may galang.',
                'content_en' => "Learn the psychology of closing with service, story-selling, and emotional connection.",
                'content_tl' => "Alamin ang sikolohiya ng maayos na pagsasara ng usapan sa pamamagitan ng pagbabahagi ng kwento at tunay na malasakit.",
                'duration_minutes' => 50,
                'reflection_prompt_en' => 'Describe your strategy for turning common prospect hesitations into opportunities for constructive dialogue.',
                'reflection_prompt_tl' => 'Ilarawan ang iyong estratehiya sa pagsagot sa mga karaniwang pag-aalinlangan ng mga prospek.',
            ],
            [
                'rank_tier' => 'Elite',
                'order' => 2,
                'title_en' => 'Duplication & Mentoring Fundamentals',
                'title_tl' => 'Pundasyon ng Duplikasyon at Paggabay',
                'description_en' => 'How to train your first-generation leaders to replicate your success.',
                'description_tl' => 'Paano sanayin ang iyong mga bagong pinuno upang magawa rin nila ang iyong tagumpay.',
                'content_en' => "Systems run the business; people run the system. Teach the teachable so they can teach others.",
                'content_tl' => "Ang maayos na sistema ang nagpapatakbo sa tagumpay; ituro sa iba upang maipasa rin nila sa susunod.",
                'duration_minutes' => 45,
                'reflection_prompt_en' => 'How will you establish a weekly duplication cadence for your new Rookie leaders?',
                'reflection_prompt_tl' => 'Paano mo itatatag ang lingguhang pagsasanay para sa iyong mga bagong Rookie leaders?',
            ],
            [
                'rank_tier' => 'Elite',
                'order' => 3,
                'title_en' => 'Time Management for High Producers',
                'title_tl' => 'Pamamahala ng Oras para sa Mataas na Produktibidad',
                'description_en' => 'Focusing 80% of energy on income-producing activities vs administrative busywork.',
                'description_tl' => 'Pagtuon ng 80% ng lakas sa mga gawaing nagdudulot ng resulta sa halip na mga pampalipas-oras lamang.',
                'content_en' => "The Pareto Principle applied to team leadership and personal sponsor acquisition.",
                'content_tl' => "Ang Prinsipyong 80/20 sa pamumuno at paghahanap ng bagong kasosyo.",
                'duration_minutes' => 40,
                'reflection_prompt_en' => 'Identify the top 3 time-wasters in your daily routine and what specific boundaries you will implement.',
                'reflection_prompt_tl' => 'Tukuyin ang 3 bagay na umuubos sa iyong oras at ano ang gagawin mo upang maitama ito.',
            ],
            [
                'rank_tier' => 'Elite',
                'order' => 4,
                'title_en' => 'Digital Outreach & Social Selling',
                'title_tl' => 'Estratehiya sa Social Media at Digital Outreach',
                'description_en' => 'Attraction marketing principles for personal branding on social platforms.',
                'description_tl' => 'Mga prinsipyo ng attraction marketing para sa personal branding sa social media.',
                'content_en' => "Position yourself as an authority of health, freedom, and excellence on LinkedIn and Facebook.",
                'content_tl' => "Ipakita ang iyong sarili bilang mapagkakatiwalaang pinuno sa kalusugan at kaunlaran.",
                'duration_minutes' => 45,
                'reflection_prompt_en' => 'Plan your next 14 days of educational and inspirational content pillars for your social channels.',
                'reflection_prompt_tl' => 'Iplano ang iyong susunod na 14 araw ng makabuluhan at kapaki-pakinabang na posts sa social media.',
            ],
            [
                'rank_tier' => 'Elite',
                'order' => 5,
                'title_en' => 'Building Team Resilience & Culture',
                'title_tl' => 'Pagpapatibay ng Tiwala at Katatagan ng Grupo',
                'description_en' => 'Weathering market cycles and fostering enduring team camaraderie.',
                'description_tl' => 'Pananatiling matatag sa anumang pagsubok at pagpapatibay ng samahan ng grupo.',
                'content_en' => "Celebrate small wins, maintain proactive communication, and lead with empathy.",
                'content_tl' => "Ipagdiwang ang bawat maliit na tagumpay at mamuno nang may pag-unawa at sigla.",
                'duration_minutes' => 50,
                'reflection_prompt_en' => 'How will you inspire team members who encounter slow periods or rejection in their business?',
                'reflection_prompt_tl' => 'Paano mo palalakasin ang loob ng mga kasama sa grupo na nakakaranas ng pagtanggi o paghina?',
            ],

            // MASTER TRAININGS (5 Modules)
            [
                'rank_tier' => 'Master',
                'order' => 1,
                'title_en' => 'Master Team Architecture & Culture',
                'title_tl' => 'Pagbuo ng Matatag na Kultura ng Grupo',
                'description_en' => 'Sculpting high-performance environments and mutual accountability.',
                'description_tl' => 'Pagtataguyod ng kapaligirang may mataas na pananagutan at sigasig.',
                'content_en' => "Culture eats strategy for breakfast. Build rituals, standards, and values that survive challenges.",
                'content_tl' => "Ang kultura ang puso ng tagumpay. Lumikha ng mga pamantayan at tradisyon na nagtatagal.",
                'duration_minutes' => 55,
                'reflection_prompt_en' => 'What cultural pillars will define your expanding Master organization?',
                'reflection_prompt_tl' => 'Anong mga haligi ng kultura ang magiging tatak ng iyong organisasyon?',
            ],
            [
                'rank_tier' => 'Master',
                'order' => 2,
                'title_en' => 'Strategic Goal Setting & Forecasting',
                'title_tl' => 'Estratehikong Pagpaplano at Pagsubaybay ng Layunin',
                'description_en' => 'Transforming subjective desires into quarterly KPI scorecards.',
                'description_tl' => 'Gawing kongkretong plano at target ang mga pangarap ng bawat miyembro.',
                'content_en' => "Track conversion velocity, active distributor retention, and promotion pipelines.",
                'content_tl' => "Subaybayan ang bilis ng pag-usad, pananatili ng miyembro, at pag-angat ng mga bagong pinuno.",
                'duration_minutes' => 50,
                'reflection_prompt_en' => 'Set your quarterly numerical targets and key result metrics for the team.',
                'reflection_prompt_tl' => 'Itakda ang iyong mga numerong target at layunin para sa darating na sangkapat ng taon.',
            ],
            [
                'rank_tier' => 'Master',
                'order' => 3,
                'title_en' => 'Conflict Resolution & Emotional Intelligence',
                'title_tl' => 'Paglutas ng Gusot at Emotional Intelligence',
                'description_en' => 'Navigating human friction, ego management, and team harmony.',
                'description_tl' => 'Matalinong pag-aayos ng hindi pagkakaunawaan at pagpapanatili ng kapayapaan.',
                'content_en' => "Separate personalities from problems. Seek first to understand before being understood.",
                'content_tl' => "Ihiwalay ang damdamin sa suliranin. Unawain muna ang kabilang panig bago magpasya.",
                'duration_minutes' => 45,
                'reflection_prompt_en' => 'Reflect on a past conflict and how emotional intelligence would have improved the outcome.',
                'reflection_prompt_tl' => 'Magmuni-muni sa isang nakaraang hindi pagkakaunawaan at paano nakatulong sana ang hinahon at talino.',
            ],
            [
                'rank_tier' => 'Master',
                'order' => 4,
                'title_en' => 'Public Speaking & Stage Mastery',
                'title_tl' => 'Husay sa Pagsasalita sa Entablado',
                'description_en' => 'Inspiring large audiences through authenticity, poise, and rhetoric.',
                'description_tl' => 'Pagbibigay-sigla sa maraming tao gamit ang katapatan, tindig, at husay sa pananalita.',
                'content_en' => "Mastering body language, voice modulation, and call-to-action climaxes.",
                'content_tl' => "Pagkontrol sa tinig, kilos sa entablado, at paggabay sa mga tagapakinig patungo sa aksyon.",
                'duration_minutes' => 55,
                'reflection_prompt_en' => 'Draft the outline of your 10-minute signature keynote speech.',
                'reflection_prompt_tl' => 'Gumawa ng balangkas ng iyong 10-minutong talumpati tungkol sa iyong paglalakbay.',
            ],
            [
                'rank_tier' => 'Master',
                'order' => 5,
                'title_en' => 'Wealth Building & Financial Governance',
                'title_tl' => 'Pagpapalago ng Yaman at Pamamahala ng Salapi',
                'description_en' => 'Managing commissions responsibly and building multi-generational wealth.',
                'description_tl' => 'Matalinong pamamahala sa kinikita at pagpapatibay ng yaman para sa pamilya.',
                'content_en' => "It is not what you make; it is what you keep and grow. Avoid lifestyle inflation.",
                'content_tl' => "Hindi lamang mahalaga kung magkano ang kinita mo, kundi kung magkano ang naipundar at napalago mo.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'What is your long-term wealth preservation philosophy and family financial blueprint?',
                'reflection_prompt_tl' => 'Ano ang iyong pangmatagalang plano sa pag-iipon at pamumuhunan para sa iyong pamilya?',
            ],

            // GRAND MASTER TRAININGS (5 Modules)
            [
                'rank_tier' => 'Grand Master',
                'order' => 1,
                'title_en' => 'Organizational Scaling & Leadership Pipelines',
                'title_tl' => 'Pagpapalawak ng Organisasyon at Pinuno',
                'description_en' => 'Architecting national and cross-regional leadership structures.',
                'description_tl' => 'Pagtatatag ng pambansa at panrehiyong istruktura ng mga pinuno.',
                'content_en' => "Scaling beyond your personal sphere of influence through delegated governance.",
                'content_tl' => "Pagpapalawak lampas sa iyong sariling kakayahan sa pamamagitan ng pagbibigay-tiwala sa mga subok na pinuno.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'How will you build an autonomous leadership tier that flourishes without your daily intervention?',
                'reflection_prompt_tl' => 'Paano ka bubuo ng samahan ng mga pinuno na kayang umunlad kahit wala ang iyong araw-araw na pangangasiwa?',
            ],
            [
                'rank_tier' => 'Grand Master',
                'order' => 2,
                'title_en' => 'Cross-Border & International Expansion',
                'title_tl' => 'Pagpapalawak sa Iba\'t Ibang Bansa',
                'description_en' => 'Managing global teams across Africa, Asia, Middle East, and the Pacific.',
                'description_tl' => 'Pamamahala sa mga grupong pandaigdig sa Asya, Gitnang Silangan, Aprika, at Pasipiko.',
                'content_en' => "Cultural nuances, international logistics, and multi-currency growth management.",
                'content_tl' => "Pag-unawa sa kultura ng iba't ibang bansa at pagsasaayos ng pandaigdigang negosyo.",
                'duration_minutes' => 55,
                'reflection_prompt_en' => 'Identify 2 target international corridors and evaluate your entry and leadership deployment plan.',
                'reflection_prompt_tl' => 'Pumili ng 2 bansang nais mong buksan at ilatag ang iyong plano sa pagpapalawak doon.',
            ],
            [
                'rank_tier' => 'Grand Master',
                'order' => 3,
                'title_en' => 'High-Stakes Negotiation & Partnership',
                'title_tl' => 'Matataas na Pakikipagkasundo at Alyansa',
                'description_en' => 'Closing enterprise alliances, bulk orders, and community partnerships.',
                'description_tl' => 'Pakikipag-ugnayan sa malalaking institusyon at komunidad.',
                'content_en' => "Structuring win-win agreements with regional distributors and executive stakeholders.",
                'content_tl' => "Pagbuo ng mga kasunduang parehong nakikinabang ang lahat ng partido.",
                'duration_minutes' => 50,
                'reflection_prompt_en' => 'Detail an enterprise partnership strategy to expand your local footprint.',
                'reflection_prompt_tl' => 'Ilatag ang estratehiya sa pakikipagtulungan sa mga lokal na institusyon o negosyo.',
            ],
            [
                'rank_tier' => 'Grand Master',
                'order' => 4,
                'title_en' => 'Legacy Brand Representation',
                'title_tl' => 'Pangangalaga sa Karangalan ng Brand',
                'description_en' => 'Serving as an official ambassador for Infinite and Legacy Club Academy.',
                'description_tl' => 'Pagsilbi bilang opisyal na kinatawan ng karangalan ng Infinite at Academy.',
                'content_en' => "Protecting intellectual property, maintaining executive poise, and media discipline.",
                'content_tl' => "Pagpapanatili ng propesyonalismo sa harap ng publiko at media.",
                'duration_minutes' => 50,
                'reflection_prompt_en' => 'How will your public persona reflect the highest values of the Legacy Club brand?',
                'reflection_prompt_tl' => 'Paano ipapakita ng iyong pagkatao ang mataas na pamantayan ng tatak ng Legacy Club?',
            ],
            [
                'rank_tier' => 'Grand Master',
                'order' => 5,
                'title_en' => 'Visionary Strategic Stewardship',
                'title_tl' => 'Pangmatagalang Direksyon at Pamumuno',
                'description_en' => 'Aligning team destiny with multi-decade company roadmaps.',
                'description_tl' => 'Pagtutugma ng direksyon ng grupo sa pangmatagalang plano ng kumpanya.',
                'content_en' => "True leadership builds for generations yet unborn. Craft your 10-year legacy charter.",
                'content_tl' => "Ang tunay na pamumuno ay nagtatayo para sa mga susunod na salinlahi. Buuin ang iyong 10-taong plano.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'Articulate your 10-year vision for your organization and the community you serve.',
                'reflection_prompt_tl' => 'Ipahayag ang iyong 10-taong pananaw para sa iyong samahan at sa lipunan.',
            ],

            // LEGEND TRAININGS (5 Modules)
            [
                'rank_tier' => 'Legend',
                'order' => 1,
                'title_en' => 'Sovereign Leadership & Global Legacy',
                'title_tl' => 'Pamumunong Pandaigdig at Pamana',
                'description_en' => 'The apex mindset of sovereign executive authority and humility.',
                'description_tl' => 'Ang pinakamataas na antas ng kapangyarihan sa pamumuno na may kababaang-loob.',
                'content_en' => "To rule is to serve. The crown is heavy only to those who lead for themselves.",
                'content_tl' => "Ang mamuno ay maglingkod. Ang korona ay magaan kapag iniaalay para sa kapakanan ng lahat.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'How do you define sovereign servant leadership at the pinnacle of your career?',
                'reflection_prompt_tl' => 'Paano mo bibigyang-kahulugan ang mapagkumbabang pamumuno sa rurok ng iyong tagumpay?',
            ],
            [
                'rank_tier' => 'Legend',
                'order' => 2,
                'title_en' => 'Enduring Enterprise Philanthropy',
                'title_tl' => 'Pangmatagalang Pagtulong at Pamumuhunan sa Tao',
                'description_en' => 'Transforming financial abundance into community clinics, education, and social upliftment.',
                'description_tl' => 'Paggamit sa yaman upang makapagpatayo ng pasilidad, magpa-aral, at tumulong sa kapwa.',
                'content_en' => "True riches are counted in the tears wiped away and the lives permanently uplifted.",
                'content_tl' => "Ang tunay na kayamanan ay nasusukat sa mga luhang napunasan at buhay na nabago.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'Outline the philanthropic foundation or community legacy project you will fund.',
                'reflection_prompt_tl' => 'Ilatag ang proyektong pangkawanggawa o pundasyong nais mong pondohan.',
            ],
            [
                'rank_tier' => 'Legend',
                'order' => 3,
                'title_en' => 'Multi-Generational Mentorship',
                'title_tl' => 'Paggabay sa mga Susunod na Henerasyon',
                'description_en' => 'Passing torch wisdom to emerging leaders so the movement never dies.',
                'description_tl' => 'Pagpapasa ng talino at aral sa mga kabataan upang magpatuloy ang kilusan.',
                'content_en' => "Mentorship is immortality. When you invest wisdom in a leader, you live forever.",
                'content_tl' => "Ang paggabay sa iba ay walang kamatayan. Nabubuhay ka sa bawat pinunong iyong nalinang.",
                'duration_minutes' => 55,
                'reflection_prompt_en' => 'Who are the 3 next-generation leaders you are grooming to succeed your mantle?',
                'reflection_prompt_tl' => 'Sino ang 3 kabataang pinuno na iyong hinahasa upang magpatuloy sa iyong nasimulan?',
            ],
            [
                'rank_tier' => 'Legend',
                'order' => 4,
                'title_en' => 'Executive Board Governance',
                'title_tl' => 'Pamamahala sa Konseho ng mga Ehekutibo',
                'description_en' => 'Participating in corporate strategy, product innovations, and global policy.',
                'description_tl' => 'Pakikibahagi sa pagpapasya sa direksyon ng kumpanya at pandaigdigang patakaran.',
                'content_en' => "Collaborating with company founders as trusted advisors and visionary stewards.",
                'content_tl' => "Pakikipagtulungan sa mga tagapagtatag ng kumpanya bilang tapat na tagapayo.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'What strategic innovation would you propose to expand the Infinite ecosystem globally?',
                'reflection_prompt_tl' => 'Anong makabagong panukala ang iyong ihahain upang palawakin pa ang Infinite sa buong mundo?',
            ],
            [
                'rank_tier' => 'Legend',
                'order' => 5,
                'title_en' => 'The Infinite Philosophy of Limitless Living',
                'title_tl' => 'Ang Pilosopiya ng Pamumuhay na Walang Hangganan',
                'description_en' => 'Living fully, loving deeply, and leaving an eternal imprint on the world.',
                'description_tl' => 'Mamuhay nang buo, magmahal nang tapat, at mag-iwan ng walang-katapusang bakas ng kabutihan.',
                'content_en' => "Congratulations on achieving the highest summit of the Legacy Club Academy. You are now a Legend.",
                'content_tl' => "Malugod na pagbati sa pag-abot sa pinakamataas na rurok ng Legacy Club Academy. Ikaw ay isa nang Alamat.",
                'duration_minutes' => 60,
                'reflection_prompt_en' => 'Write your final decree and message to the global members of the Legacy Club Academy.',
                'reflection_prompt_tl' => 'Isulat ang iyong huling mensahe at tagubilin para sa lahat ng miyembro ng Legacy Club Academy.',
            ],
        ];

        foreach ($trainings as $tr) {
            AcademyTraining::updateOrCreate(
                [
                    'rank_tier' => $tr['rank_tier'],
                    'order' => $tr['order'],
                ],
                $tr
            );
        }
    }

    private function initializeExistingMembers(): void
    {
        $members = AcademyMember::where('status', 'Approved')->get();

        foreach ($members as $member) {
            if (!$member->program_start_date) {
                $member->program_start_date = $member->approved_at ? $member->approved_at->toDateString() : $member->created_at->toDateString();
                $member->program_target_date = \Carbon\Carbon::parse($member->program_start_date)->addDays(60)->toDateString();
                $member->program_status = 'Active';
                $member->save();
            }

            $member->initializeRankProgression($member->rank_tier ?? 'Rookie');
        }
    }
}
