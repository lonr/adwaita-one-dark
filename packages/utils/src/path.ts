import { fileURLToPath } from 'node:url';

// https://github.com/nodejs/node/issues/41521

/**
 * convert fileURLOrPath to path
 * @param fileURLOrPath a file URL or a path string (we assume a string a path string)
 * @returns path
 */
export function toPathIfFileURL(fileURLOrPath: URL | string): string {
  if (typeof fileURLOrPath === 'string') {
    return fileURLOrPath;
  }

  if (fileURLOrPath.protocol !== 'file:') {
    throw new Error('Expected a file URL. Received ' + fileURLOrPath.href);
  }
  return fileURLToPath(fileURLOrPath);
}
