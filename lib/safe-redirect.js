/**
 * Returns the path if it is a safe internal redirect target, otherwise null.
 * Blocks external URLs and protocol-relative ("//host") redirects.
 */
export function safeInternalPath(path) {
  if (path && path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\")) {
    return path;
  }
  return null;
}
