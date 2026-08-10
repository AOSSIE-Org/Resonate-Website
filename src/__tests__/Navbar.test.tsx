import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      developers: 'Developers',
      community: 'Community',
      aossie: 'AOSSIE',
      download: 'Download Now',
      toggleMenu: 'Toggle menu',
      close: 'Close',
      menu: 'Menu',
      selectLanguage: 'Select language',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

// Mock navigation
vi.mock('@/i18n/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ replace: vi.fn() }),
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

// Mock theme provider
vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'dark', setTheme: vi.fn() }),
}));

import { Navbar } from '@/components/layout/Navbar';

describe('Navbar Component', () => {
  it('renders brand logo and navigation links correctly', () => {
    render(<Navbar />);
    
    // Verify Navbar renders brand and key text items
    expect(screen.getByAltText(/Resonate Logo/i)).toBeInTheDocument();
    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('AOSSIE')).toBeInTheDocument();
  });

  it('renders Download button properly', () => {
    render(<Navbar />);
    expect(screen.getAllByText('Download Now').length).toBeGreaterThan(0);
  });
});
