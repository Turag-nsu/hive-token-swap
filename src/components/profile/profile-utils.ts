// Extract the first image URL from post body
export function extractImageFromBody(body: string): string | null {
  // Look for markdown image syntax ![alt](url)
  const markdownImageRegex = /!\[.*?\]\((.*?)\)/;
  const markdownMatch = body.match(markdownImageRegex);
  if (markdownMatch && markdownMatch[1]) {
    return markdownMatch[1];
  }

  // Look for HTML img tags
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const htmlMatch = body.match(htmlImageRegex);
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1];
  }

  // Look for plain URLs that might be images
  const urlRegex = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+\.(?:jpg|jpeg|png|gif|webp))/i;
  const urlMatch = body.match(urlRegex);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }

  return null;
}