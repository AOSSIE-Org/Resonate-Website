/** External links used across the site. Components import these instead of hard-coding URLs. */

// AOSSIE organisation
export const AOSSIE_URL = 'https://aossie.org';
export const AOSSIE_PROJECTS_URL = 'https://aossie.org/projects';
// Donations to AOSSIE, linked from the support page
export const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/AOSSIE-Org';
// Supporters listed on the support page
export const GSOC_URL = 'https://summerofcode.withgoogle.com';
export const STABILITY_NEXUS_URL = 'https://stability.nexus';

// App stores
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.resonate.resonate';
// Resonate is not on the App Store yet, so iOS entry points show "coming soon". Add APP_STORE_URL here once it is listed.

// Source code
export const GITHUB_ORG_URL = 'https://github.com/AOSSIE-Org';
export const GITHUB_APP_REPO_URL = 'https://github.com/AOSSIE-Org/Resonate';
export const GITHUB_BACKEND_REPO_URL = 'https://github.com/AOSSIE-Org/Resonate-Backend';
export const GITHUB_WEBSITE_REPO_URL = 'https://github.com/AOSSIE-Org/Resonate-Website';
export const GITLAB_URL = 'https://gitlab.com/aossie';

// Community and social
export const DISCORD_URL = 'https://discord.gg/hjUhu33uAn';
export const TWITTER_URL = 'https://twitter.com/aossie_org';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/aossie/';
export const YOUTUBE_URL = 'https://www.youtube.com/@AOSSIE-Org';

export const SOCIAL_LINKS = {
  discord: DISCORD_URL,
  github: GITHUB_ORG_URL,
  gitlab: GITLAB_URL,
  twitter: TWITTER_URL,
  linkedin: LINKEDIN_URL,
  youtube: YOUTUBE_URL,
} as const;
