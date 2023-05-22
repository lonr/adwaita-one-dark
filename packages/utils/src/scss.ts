import fs from 'fs-extra';
import { toPathIfFileURL } from './path';
import sass from 'node-sass';

export async function compileScss(
  entries: (URL | string)[],
  transformer?: (css: string) => string
): Promise<void> {
  for (let entry of entries) {
    // entry may be a URL or a string(URL string or path string)
    entry = toPathIfFileURL(entry);
    const result = sass.renderSync({ file: entry });
    let css = result.css.toString();
    if (transformer) {
      css = transformer(css);
    }
    const filePath: string = entry.replace(/scss$/, 'css');
    await fs.writeFile(filePath, css);
  }
}
