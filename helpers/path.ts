import { join } from 'path';

/**
 * to make the paths absolute
 * @param root the absolute path of the parent's folder
 * @param paths paths in a same folder
 * @returns
 */
export function resolveAllPath(root: string, paths: string[]) {
  return paths.map((path) => join(root, path));
}
