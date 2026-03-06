/**
 * Helper function to get the correct image path
 * Prepends the base path if deploying to a subdirectory
 */
export function getImagePath(imagePath: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  if (!imagePath.startsWith("/")) {
    imagePath = "/" + imagePath
  }
  return basePath + imagePath
}
