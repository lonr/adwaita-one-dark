import fs from 'fs-extra';
import { fileURLToPath } from 'node:url';
import sass from 'sass';

export async function compileScss(
  entries: (URL | string)[],
  transformer?: (css: string) => string
): Promise<void> {
  for (let entry of entries) {
    // entry may be a URL or a string(URL string or path string)
    try {
      entry = fileURLToPath(entry);
    } catch (e) {
      // it's a path string
      entry = entry.toString();
    }
    const result = sass.compile(entry);
    const css = transformer ? transformer(result.css) : result.css;
    const filePath = entry.replace(/scss$/, 'css');
    await fs.writeFile(filePath, css);
  }
}
