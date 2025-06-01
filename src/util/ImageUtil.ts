export function getProperImageUrl(url?: string): string {
  if (!url) return "";

  if (url.startsWith("http")) return url;
  return `http://localhost:3000${url}`;

  return "";
}
