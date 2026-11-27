/**
 * Legacy Club Academy — Tier header metadata for CommandmentsPanel (bilingual EN / TL).
 * Commandment entries themselves are managed strictly by Admin in the database.
 */

export const COMMANDMENT_TIERS = ['Rookie', 'Elite', 'Master', 'Grand Master', 'Legend'];

export const ACADEMY_COMMANDMENTS = {
    rookie: {
        heading_en: 'The Foundation Commandments',
        heading_tl: 'Ang mga Utos ng Pundasyon',
        tagline_en: 'Every legacy begins with a disciplined first step.',
        tagline_tl: 'Ang bawat legacy ay nagsisimula sa isang disiplinadong unang hakbang.',
    },
    elite: {
        heading_en: 'The Momentum Commandments',
        heading_tl: 'Ang mga Utos ng Momentum',
        tagline_en: 'Elite members turn motivation into repeatable results.',
        tagline_tl: 'Ginagawang tuloy-tuloy na resulta ng mga Elite ang motibasyon.',
    },
    master: {
        heading_en: 'The Mastery Commandments',
        heading_tl: 'Ang mga Utos ng Karunungan',
        tagline_en: 'Masters build leaders, not followers.',
        tagline_tl: 'Ang mga Master ay bumubuo ng lider, hindi ng taga-sunod.',
    },
    'grand master': {
        heading_en: 'The Stewardship Commandments',
        heading_tl: 'Ang mga Utos ng Katiwalaan',
        tagline_en: 'Grand Masters think in generations, not in months.',
        tagline_tl: 'Ang mga Grand Master ay nag-iisip para sa henerasyon, hindi lang para sa mga buwan.',
    },
    legend: {
        heading_en: 'The Legacy Commandments',
        heading_tl: 'Ang mga Utos ng Legacy',
        tagline_en: 'A Legend is remembered for who they lifted, not what they earned.',
        tagline_tl: 'Ang Legend ay naaalala sa mga taong inangat nila, hindi sa kinita nila.',
    },
};

export function getCommandments(tierName) {
    const key = String(tierName || 'Rookie').toLowerCase().trim();
    return ACADEMY_COMMANDMENTS[key] || ACADEMY_COMMANDMENTS.rookie;
}
