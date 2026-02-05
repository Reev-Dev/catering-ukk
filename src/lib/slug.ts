// lib/slug.ts
export function toSlug(text?: string) {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function fromSlug(slug?: string) {
  if (!slug) return "";

  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
