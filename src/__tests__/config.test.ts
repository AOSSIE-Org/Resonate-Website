import fs from 'fs';
import path from 'path';
import { describe, it, expect, vi, afterEach } from 'vitest';
import * as links from '@/config/links';
import { SITE_URL, getSiteUrl } from '@/config/site';
import { LEGAL_PAGES } from '@/config/legal';
import { SUPPORT_LOGOS, SUPPORT_PAGE_PATH } from '@/config/support';

afterEach(() => vi.unstubAllEnvs());

describe('external links', () => {
  const { SOCIAL_LINKS, ...urls } = links;

  it.each(Object.entries({ ...urls, ...SOCIAL_LINKS }))('%s is an absolute https:// URL', (_name, url) => {
    expect(new URL(url).protocol).toBe('https:');
  });

  it('sends supporters to AOSSIE on GitHub Sponsors', () => {
    expect(links.GITHUB_SPONSORS_URL).toBe('https://github.com/sponsors/AOSSIE-Org');
  });

  it('builds SOCIAL_LINKS from the named constants', () => {
    expect(Object.values(urls)).toEqual(expect.arrayContaining(Object.values(SOCIAL_LINKS)));
  });
});

describe('site URL', () => {
  it('has no trailing slash', () => {
    expect(SITE_URL).not.toMatch(/\/$/);
  });

  it('defaults to the production origin when NEXT_PUBLIC_SITE_URL is unset', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', '');
    expect(getSiteUrl()).toBe('https://resonate.aossie.org');
  });

  it('honours NEXT_PUBLIC_SITE_URL and strips one trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://preview.example.org/');
    expect(getSiteUrl()).toBe('https://preview.example.org');
  });
});

describe('legal pages', () => {
  it.each(Object.entries(LEGAL_PAGES))('%s has a single-segment path and a document in the project root', (_name, page) => {
    expect(page.path).toMatch(/^\/[a-z-]+$/);
    expect(fs.existsSync(path.join(process.cwd(), page.file))).toBe(true);
  });
});

describe('support page', () => {
  it('has a single-segment path that no legal page uses', () => {
    expect(SUPPORT_PAGE_PATH).toMatch(/^\/[a-z-]+$/);
    expect(Object.values(LEGAL_PAGES).map((page) => page.path)).not.toContain(SUPPORT_PAGE_PATH);
  });

  it.each(Object.entries(SUPPORT_LOGOS))('%s logo is a file in public/', (_name, src) => {
    expect(fs.existsSync(path.join(process.cwd(), 'public', src))).toBe(true);
  });
});
