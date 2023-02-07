import fs from 'fs-extra';
import { toPathIfFileURL } from './path';
import sass from 'sass';

export async function compileScss(
  entries: (URL | string)[],
  transformer?: (css: string) => string
): Promise<void> {
  for (let entry of entries) {
    // entry may be a URL or a string(URL string or path string)
    entry = toPathIfFileURL(entry);
    const result: sass.CompileResult = sass.compile(entry);
    const css: string = transformer ? transformer(result.css) : result.css;
    const filePath: string = entry.replace(/scss$/, 'css');
    await fs.writeFile(filePath, css);
  }
}
