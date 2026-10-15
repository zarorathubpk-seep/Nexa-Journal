/**
 * Resolves local assets with proper base URL support for GitHub Pages and subpath hosting
 */
export function getAssetUrl(path: string, baseUrl?: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }

  // Remove leading slash for safe concatenation
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If baseUrl provided (e.g. for testing or SSR), use it
  if (baseUrl !== undefined) {
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return `${cleanBase}${cleanPath}`;
  }

  // Vite environment support
  try {
    const viteBase = (import.meta as any)?.env?.BASE_URL;
    if (viteBase) {
      const cleanBase = viteBase.endsWith('/') ? viteBase : `${viteBase}/`;
      return `${cleanBase}${cleanPath}`;
    }
  } catch {
    // fallback if import.meta is unavailable in test environment
  }

  return `/${cleanPath}`;
}
