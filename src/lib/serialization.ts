/** Safe inside a script element, even when a title contains HTML-like text. */
export function jsonForHtml(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function xmlText(value: unknown): string {
  return String(value ?? "").replace(/[<>&"']/g, ch => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
  })[ch]!);
}
