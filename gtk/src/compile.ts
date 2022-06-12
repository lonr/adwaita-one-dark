import * as csstree from 'css-tree';
import { compileScss } from 'utils';

const srcDir: URL = new URL('../src/', import.meta.url);

export async function compileGtk3(): Promise<void> {
  return compileScss([new URL('gtk-3.0/gtk.scss', srcDir), new URL('gtk-3.0/gtk-dark.scss', srcDir)]);
}

export async function compileGtk4(): Promise<void> {
  return compileScss([new URL('gtk-4.0/gtk.scss', srcDir), new URL('gtk-4.0/gtk-dark.scss', srcDir)]);
}

export async function compileShell(): Promise<void> {
  return compileScss([new URL('gnome-shell/gnome-shell.scss', srcDir)], fixResourceUrls);
}

// url('resource:///org/gnome/shell/theme/checkbox-off-light.svg')
// results
// url('checkbox-off-light.svg')
function fixResourceUrls(css: string): string {
  const ast = csstree.parse(css);
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
  return Promise.all([compileGtk3(), compileGtk4(), compileShell()]);
}

await compile();
