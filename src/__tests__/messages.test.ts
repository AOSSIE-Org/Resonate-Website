import { describe, it, expect } from "vitest";
import {
  parse,
  isArgumentElement,
  isNumberElement,
  isDateElement,
  isTimeElement,
  isSelectElement,
  isPluralElement,
  isTagElement,
  type MessageFormatElement,
} from "@formatjs/icu-messageformat-parser";
import en from "@/messages/en.json";
import hi from "@/messages/hi.json";
import { languages } from "@/config/languages";

type Catalog = { [key: string]: string | Catalog };

function flatten(catalog: Catalog, prefix = ""): Record<string, string> {
  return Object.entries(catalog).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string" ? { ...acc, [path]: value } : { ...acc, ...flatten(value, path) };
  }, {});
}

// Argument names from a real ICU parse: whitespace like `{ name }` is normalised and
// malformed messages (e.g. an unclosed `{name`) throw instead of passing silently.
function argumentNames(elements: MessageFormatElement[]): string[] {
  return elements.flatMap((el) => {
    if (isArgumentElement(el) || isNumberElement(el) || isDateElement(el) || isTimeElement(el)) return [el.value];
    if (isSelectElement(el) || isPluralElement(el)) {
      return [el.value, ...Object.values(el.options).flatMap((option) => argumentNames(option.value))];
    }
    if (isTagElement(el)) return argumentNames(el.children);
    return [];
  });
}

// Deduplicated: a translation may repeat a placeholder fewer or more times than English
const placeholders = (text: string) => [...new Set(argumentNames(parse(text)))].sort();

const catalogs: Record<string, Catalog> = { en, hi };
const english = flatten(en);
const translations = Object.keys(catalogs).filter((code) => code !== "en");

describe("Translation catalogs", () => {
  it("ships a catalog for every configured language", () => {
    for (const { code } of languages) {
      expect(catalogs[code], code).toBeDefined();
    }
  });

  it.each(translations)("%s has exactly the same keys as English", (code) => {
    expect(Object.keys(flatten(catalogs[code])).sort()).toEqual(Object.keys(english).sort());
  });

  it.each(Object.keys(catalogs))("%s has no empty strings", (code) => {
    const empty = Object.entries(flatten(catalogs[code])).filter(([, text]) => text.trim() === "");
    expect(empty).toEqual([]);
  });

  it.each(translations)("%s keeps every ICU placeholder used in English", (code) => {
    const translated = flatten(catalogs[code]);
    for (const [key, text] of Object.entries(english)) {
      expect(placeholders(translated[key]), key).toEqual(placeholders(text));
    }
  });

  it.each(Object.keys(catalogs))("%s defines the SEO title and description", (code) => {
    const flat = flatten(catalogs[code]);
    expect(flat["metadata.title"]?.trim()).toBeTruthy();
    expect(flat["metadata.description"]?.trim()).toBeTruthy();
  });
});
