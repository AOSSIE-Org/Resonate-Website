import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import fc from 'fast-check';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { renderWithIntl } from './helpers/intl';
import { Button } from '@/components/ui/Button';
import LazyImage from '@/components/LazyImage';

describe('Button', () => {
  it('is a type="button" button that calls onClick', () => {
    const onClick = vi.fn();
    renderWithIntl(<Button onClick={onClick}>Go</Button>);
    const button = screen.getByRole('button', { name: 'Go' });
    expect(button).toHaveAttribute('type', 'button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a locale-prefixed link for internal hrefs', () => {
    renderWithIntl(<Button href="/support">Support</Button>, 'hi');
    expect(screen.getByRole('link', { name: 'Support' })).toHaveAttribute('href', '/hi/support');
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('keeps external hrefs and passes target and rel through', () => {
    renderWithIntl(
      <Button href="https://example.org" target="_blank" rel="noopener noreferrer">
        Out
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Out' });
    expect(link).toHaveAttribute('href', 'https://example.org');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('styles the two variants differently and appends custom classes', () => {
    renderWithIntl(
      <>
        <Button className="extra-a">A</Button>
        <Button variant="type2" className="extra-b">
          B
        </Button>
      </>,
    );
    const a = screen.getByRole('button', { name: 'A' });
    const b = screen.getByRole('button', { name: 'B' });
    expect(a.className).toContain('bg-(--button-primary-bg)');
    expect(a.className).toMatch(/extra-a$/);
    expect(b.className).toContain('bg-(--button-tertiary-bg)');
    expect(b.className).not.toContain('bg-(--button-primary-bg)');
  });

  it('shows a decorative arrow only with right_arrow', () => {
    renderWithIntl(<Button right_arrow>Next</Button>);
    expect(screen.getByRole('button').querySelector('svg[aria-hidden="true"]')).not.toBeNull();
    cleanup();
    renderWithIntl(<Button>Plain</Button>);
    expect(screen.getByRole('button').querySelector('svg')).toBeNull();
  });

  it('property: renders exactly one link or one button carrying the label, for any props', () => {
    fc.assert(
      fc.property(
        fc.stringMatching(/^[A-Za-z][A-Za-z ]{0,19}$/),
        fc.constantFrom('type1', 'type2') as fc.Arbitrary<'type1' | 'type2'>,
        fc.boolean(),
        fc.option(fc.constantFrom('/support', '/privacy', 'https://aossie.org', '#contact'), { nil: undefined }),
        (label, variant, arrow, href) => {
          const { container, unmount } = renderWithIntl(
            <Button variant={variant} right_arrow={arrow} href={href}>
              {label}
            </Button>,
          );
          const el = container.firstElementChild!;
          expect(container.children).toHaveLength(1);
          expect(el.tagName).toBe(href ? 'A' : 'BUTTON');
          expect(el.querySelector('span')!.textContent).toBe(label);
          expect(el.querySelectorAll('svg')).toHaveLength(arrow ? 1 : 0);
          if (href?.startsWith('/')) expect(el.getAttribute('href')).toBe(`/en${href}`);
          unmount();
        },
      ),
      { numRuns: 40 },
    );
  });
});

describe('LazyImage', () => {
  it('renders a sized lazy image with the default responsive sizes', () => {
    renderWithIntl(<LazyImage src="/og-image.png" alt="GitHub" width={40} height={20} className="c" />);
    const img = screen.getByAltText('GitHub');
    expect(img).toHaveAttribute('width', '40');
    expect(img).toHaveAttribute('height', '20');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
    expect(img).toHaveClass('c');
  });

  it('fills its parent without intrinsic size, honouring priority and custom sizes', () => {
    renderWithIntl(<LazyImage src="/og-image.png" alt="Fill" fill priority sizes="10vw" />);
    const img = screen.getByAltText('Fill');
    expect(img).not.toHaveAttribute('width');
    expect(img).toHaveAttribute('sizes', '10vw');
    expect(img).not.toHaveAttribute('loading', 'lazy');
    expect(img.style.position).toBe('absolute');
  });

  it('uses the default responsive sizes in fill mode too', () => {
    renderWithIntl(<LazyImage src="/og-image.png" alt="Default fill" fill />);
    expect(screen.getByAltText('Default fill')).toHaveAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw');
  });
});
