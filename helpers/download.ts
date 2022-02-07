// https://sebhastian.com/nodejs-download-file/
import { get } from 'https';
import type { IncomingMessage } from 'http';
import { ensureDir } from 'fs-extra';
// to avoid ERR_INVALID_ARG_TYPE when using fs-extra
import { writeFile } from 'fs/promises';
import { extract, ExtractOptions } from 'tar';
import { basename, join } from 'path';
import { pipeline } from 'stream/promises';

export function getUrlBasename(url: string) {
  return basename(new URL(url).pathname);
}

export function createDownloadStream(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const req = get(url, resolve);
    req.on('error', reject);
  });
}

export async function downloadFile(url: string, dir: string) {
  await ensureDir(dir);
  const fileName = join(dir, getUrlBasename(url));
  return writeFile(fileName, await createDownloadStream(url));
}

export async function downloadAndUntar(
  tarUrl: string,
  options: ExtractOptions,
) {
  const cwd = options.C ?? options.cwd;
  if (!cwd) {
    throw new Error('syncing upstream: dest dir option should be provided');
  }
  await ensureDir(cwd);
  return pipeline(await createDownloadStream(tarUrl), extract(options));
}
