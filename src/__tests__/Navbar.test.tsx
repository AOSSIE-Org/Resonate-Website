import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import React from 'react';

// Mock next-intl hooks
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      developers: 'Developers',
      community: 'Community',
      aossie: 'AOSSIE',
      contact: 'Contact',
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

  describe('Contact link', () => {
    afterEach(() => {
      document.getElementById('contact')?.remove();
    });

    function addFooter() {
      const footer = document.createElement('footer');
      footer.id = 'contact';
      footer.tabIndex = -1;
      document.body.appendChild(footer);
      const scrollIntoView = vi.fn();
      footer.scrollIntoView = scrollIntoView;
      return { footer, scrollIntoView };
    }

    it('points at the footer and smooth-scrolls to it, moving focus there', () => {
      const { footer, scrollIntoView } = addFooter();
      render(<Navbar />);
      const link = screen.getByRole('link', { name: 'Contact' });
      expect(link).toHaveAttribute('href', '#contact');
      expect(link).not.toHaveAttribute('target');

      fireEvent.click(link);
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
      expect(document.activeElement).toBe(footer);
    });

    it('jumps instantly when the user prefers reduced motion', () => {
      const { scrollIntoView } = addFooter();
      const original = window.matchMedia;
      window.matchMedia = ((query: string) =>
        ({ ...original(query), matches: query.includes('reduce') })) as typeof window.matchMedia;
      try {
        render(<Navbar />);
        fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
      } finally {
        window.matchMedia = original;
      }
    });

    it('closes the mobile menu and scrolls when Contact is tapped there', () => {
      const { scrollIntoView } = addFooter();
      render(<Navbar />);
      fireEvent.click(screen.getByLabelText('Toggle menu'));
      const mobileNav = screen.getByRole('navigation', { name: 'mobileNav' });
      const contact = Array.from(mobileNav.querySelectorAll('a')).find((a) => a.textContent === 'Contact')!;
      fireEvent.click(contact);
      expect(scrollIntoView).toHaveBeenCalledTimes(1);
      expect(screen.queryByRole('navigation', { name: 'mobileNav' })).not.toBeInTheDocument();
    });

    it('does nothing if the footer is not on the page', () => {
      render(<Navbar />);
      expect(() => fireEvent.click(screen.getByRole('link', { name: 'Contact' }))).not.toThrow();
    });
  });
});
