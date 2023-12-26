/**
 * Returns unique items.
 */
export function uniq<T>(src: Array<T>): Array<T> {
  const result: Array<T> = [];
  src.forEach((t) => {
    if (result.indexOf(t) === -1) {
      result.push(t);
    }
  });

  return result;
}

/**
 * Return path array[string]
 */
export function getPaths(path: string | string[] = "") {
  if (typeof path === "string") path = [path];
  if (path.length === 0) path = ["/"];
  else path = path.map((p) => (p.startsWith("/") ? p : `/${p}`));
  return path;
}
