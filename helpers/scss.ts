import { writeFile } from 'fs-extra';
import { compile } from 'sass';

export async function compileScss(entries: string[]) {
  for (const entry of entries) {
    // const result = compile(entry, { style: 'compressed' });
    const result = compile(entry);
    const filePath = entry.replace(/scss$/, 'css');
    await writeFile(filePath, result.css);
  }
}
