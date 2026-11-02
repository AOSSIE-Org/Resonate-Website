/** Types for the parts of @aossie-org/social-share-button the site uses (the package ships plain JavaScript). */
declare module '@aossie-org/social-share-button' {
  export interface SocialShareLabels {
    share?: string;
    close?: string;
    copy?: string;
    copied?: string;
    copyFailed?: string;
    urlLabel?: string;
  }

  export interface SocialShareOptions {
    container?: HTMLElement | string;
    url?: string;
    title?: string;
    platforms?: string[];
    theme?: 'dark' | 'light';
    showButton?: boolean;
    labels?: SocialShareLabels;
  }

  export default class SocialShareButton {
    constructor(options?: SocialShareOptions);
    openModal(): void;
    closeModal(): void;
    updateOptions(options: SocialShareOptions): void;
    destroy(): void;
  }
}
