/** Prefix a /public path with the Vite base, so it works under /<repo>/ on GitHub Pages. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
