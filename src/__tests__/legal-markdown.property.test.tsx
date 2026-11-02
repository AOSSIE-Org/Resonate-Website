import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { LegalDocument, parseLegalMarkdown, renderLegalInline, resolveLegalHref } from "@/lib/legal-markdown";

const links = { privacy: "/hi/privacy", terms: "/hi/terms" };

/** Lines the legal documents are made of: headings, list items, paragraph text and blanks. */
const word = fc.stringMatching(/^[A-Za-z0-9.,]{1,8}$/);
const text = fc.array(word, { minLength: 1, maxLength: 5 }).map((w) => w.join(" "));
const line = fc.oneof(
  text.map((t) => ({ kind: "heading" as const, src: `${"#".repeat(1 + (t.length % 3))} ${t}` })),
  text.map((t) => ({ kind: "item" as const, src: `${t.length % 2 ? "*" : "-"} ${t}` })),
  text.map((t) => ({ kind: "text" as const, src: t })),
  fc.constant({ kind: "blank" as const, src: "" }),
);

describe("LegalDocument lists", () => {
  it("renders list blocks as <ul> with one <li> per item", () => {
    const html = renderToStaticMarkup(<LegalDocument links={links} source={"Intro\n\n- one\n- **two**\n\nOutro"} />);
    expect(html).toBe('<div lang="en"><p>Intro</p><ul><li>one</li><li><strong>two</strong></li></ul><p>Outro</p></div>');
  });

  it("passes the wrapper class through", () => {
    expect(renderToStaticMarkup(<LegalDocument links={links} source="x" className="prose" />)).toBe(
      '<div lang="en" class="prose"><p>x</p></div>',
    );
  });
});

describe("legal Markdown properties", () => {
  it("property: no line of text is lost or reordered by parsing", () => {
    fc.assert(
      fc.property(fc.array(line, { maxLength: 30 }), (lines) => {
        const blocks = parseLegalMarkdown(lines.map((l) => l.src).join("\n"));
        const parsedWords = blocks
          .flatMap((b) => (b.type === "list" ? b.items : [b.text]))
          .join(" ")
          .split(/\s+/)
          .filter(Boolean);
        const sourceWords = lines
          .map((l) => l.src.replace(/^(#{1,3}|[*-])\s+/, ""))
          .join(" ")
          .split(/\s+/)
          .filter(Boolean);
        expect(parsedWords).toEqual(sourceWords);
        expect(blocks.filter((b) => b.type === "heading")).toHaveLength(lines.filter((l) => l.kind === "heading").length);
        for (const b of blocks) {
          if (b.type === "list") expect(b.items.length).toBeGreaterThan(0);
          else expect(b.text.trim()).not.toBe("");
        }
      }),
    );
  });

  it("property: resolved hrefs are always null, a site page or a safe http(s)/mailto/relative link", () => {
    const href = fc.oneof(
      fc.string(),
      fc.webUrl(),
      fc.constantFrom("PRIVACY.md", "./TERMS.md", "javascript:alert(1)", "data:text/html,x", "vbscript:x", "mailto:a@b.c", "/x", "#top"),
    );
    fc.assert(
      fc.property(href, (h) => {
        const out = resolveLegalHref(h, links);
        if (out === null) return;
        expect(out === links.privacy || out === links.terms || /^(https?:|mailto:|\/|#)/i.test(out)).toBe(true);
        expect(out).not.toMatch(/^\s*(javascript|data|vbscript):/i);
      }),
    );
  });

  it("property: rendering inline Markdown keeps the visible text and never emits an unsafe link", () => {
    const segment = fc.oneof(
      word,
      word.map((w) => `**${w}**`),
      word.map((w) => `\`${w}\``),
      fc.tuple(word, fc.constantFrom("https://aossie.org", "PRIVACY.md", "javascript:void(0)", "ftp://x")).map(([w, u]) => `[${w}](${u})`),
    );
    fc.assert(
      fc.property(fc.array(segment, { minLength: 1, maxLength: 8 }), (segments) => {
        const source = segments.join(" ");
        const html = renderToStaticMarkup(<p>{renderLegalInline(source, links)}</p>);
        const visible = source.replace(/\*\*|`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
        const doc = new DOMParser().parseFromString(html, "text/html");
        expect(doc.body.textContent).toBe(visible);
        for (const a of Array.from(doc.querySelectorAll("a"))) {
          expect(a.getAttribute("href")).toMatch(/^(https:\/\/aossie\.org|\/hi\/privacy)$/);
        }
      }),
    );
  });
});
