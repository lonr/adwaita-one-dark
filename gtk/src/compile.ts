import * as csstree from 'css-tree';
import { compileScss } from 'utils';

const srcDir: URL = new URL('../src/', import.meta.url);

export async function compileColors(): Promise<void> {
  return compileScss([new URL('colors/gtk.scss', srcDir), new URL('colors/gtk-dark.scss', srcDir)]);
}

export async function compileShell(): Promise<void> {
  return compileScss([new URL('gnome-shell/gnome-shell.scss', srcDir)], fixResourceUrls);
}

// url('resource:///org/gnome/shell/theme/checkbox-off-light.svg')
// results
// url('checkbox-off-light.svg')
function fixResourceUrls(css: string): string {
  const ast: csstree.CssNode = csstree.parse(css);
  csstree.walk(ast, (node) => {
    if (node.type === 'Url') {
      // @types/css-tree may be outdated
      // https://github.com/csstree/csstree/blob/master/fixtures/ast/value/Url.json
      // https://github.com/csstree/csstree/issues/88
      // @ts-expect-error node.value is a string
      node.value = node.value.replace(/^resource:\/\/\/org\/gnome\/shell\/theme\//, '');
    }
  });
  return csstree.generate(ast);
}

export async function compile(): Promise<void[]> {
  return Promise.all([compileColors(), compileShell()]);
}

await compile();
