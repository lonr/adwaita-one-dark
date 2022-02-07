import { writeFile, readdir, stat } from 'fs-extra';
import { resolve } from 'path';
import { configure } from 'nunjucks';
import { blend } from './color';

// call .render with absolute paths
const env = configure('/');

env.addFilter('blend', blend);

function revertFilePath(templatePath: string) {
  return templatePath.replace(/\.njk$/, '');
}

// find all .njk files in a folder
// https://stackoverflow.com/a/25478516/
export async function findTemplates(path: string): Promise<string[]> {
  // throw if the path doesn't exist
  const stats = await stat(path);
  let result: string[] = [];

  if (stats.isFile() && path.endsWith('.njk')) {
    result = [path];
  } else if (stats.isDirectory()) {
    const paths = await readdir(path);
    // https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/
    result = await paths.reduce(
      // https://stackoverflow.com/a/62537717/5783347
      async (prev, curr) =>
        (await prev).concat(await findTemplates(resolve(path, curr))),
      // just `[]` should be fine
      Promise.resolve([] as string[]),
    );
  }

  return result;
}

export function renderTemplates(templates: string[], context: object) {
  return Promise.all(
    templates.map((templatePath) => {
      // It doesn't seem to make sense to make `render` async
      // https://mozilla.github.io/nunjucks/api.html#asynchronous-support
      // https://github.com/mozilla/nunjucks/blob/fd500902d7c88672470c87170796de52fc0f791a/nunjucks/src/environment.js#L302-L305
      const res = env.render(templatePath, context);
      const filePath = revertFilePath(templatePath);
      return writeFile(filePath, res);
    }),
  );
}

export async function findAndRenderTemplates(path: string, context: object) {
  const templates = await findTemplates(path);
  return renderTemplates(templates, context);
}
