import { resolve } from 'node:path';
import nunjucks from 'nunjucks';
import fs from 'fs-extra';
import slug from 'slug';
import { toPathIfFileURL } from './path';
const { writeFile, readdir, stat } = fs;

const env: nunjucks.Environment = nunjucks.configure('/');

env.addFilter('slug', (str) => slug(str, { lower: false }));

export function filePath(templatePath: string, context: object): string {
  templatePath = env.renderString(templatePath, context);
  return templatePath.replace(/\.njk$/, '');
}

// find all .njk files in a folder
// https://stackoverflow.com/a/25478516/
export async function findTemplates(fileURLOrPath: URL | string): Promise<string[]> {
  const path: string = toPathIfFileURL(fileURLOrPath);
  // throw if the path doesn't exist
  const stats: fs.Stats = await stat(path);
  let result: string[] = [];

  if (stats.isFile() && path.endsWith('.njk')) {
    result = [path];
  } else if (stats.isDirectory()) {
    const paths: string[] = await readdir(path);
    // https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/
    result = await paths.reduce(
      // https://stackoverflow.com/a/62537717/5783347
      async (prev, curr) => (await prev).concat(await findTemplates(resolve(path, curr))),
      // just `[]` should be fine
      Promise.resolve([] as string[])
    );
  }

  return result;
}

export function renderTemplates(templates: string[], context: object): Promise<void[]> {
  return Promise.all(
    templates.map((templatePath) => {
      // It doesn't seem to make sense to make `render` async
      // https://mozilla.github.io/nunjucks/api.html#asynchronous-support
      // https://github.com/mozilla/nunjucks/blob/fd500902d7c88672470c87170796de52fc0f791a/nunjucks/src/environment.js#L302-L305
      const res: string = env.render(templatePath, context);
      const file: string = filePath(templatePath, context);
      return writeFile(file, res);
    })
  );
}

export async function findAndRenderTemplates(fileURLOrPath: URL | string, context: object): Promise<void[]> {
  const templates: string[] = await findTemplates(fileURLOrPath);
  return renderTemplates(templates, context);
}
