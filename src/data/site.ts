const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/$/, "") ?? "";

export function withBasePath(path: string) {
  if (!basePath || !path.startsWith("/")) {
    return path;
  }

  return `${basePath}${path}`;
}