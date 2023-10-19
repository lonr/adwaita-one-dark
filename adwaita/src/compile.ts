import * as csstree from 'css-tree';
import { compileScss } from 'utils';

const srcDir: URL = new URL('../templates/', import.meta.url);

export async function compileColors(): Promise<void> {
  return compileScss([new URL('colors/gtk.scss', srcDir), new URL('colors/gtk-dark.scss', srcDir)]);
}

export async function compileShell(): Promise<void> {
  await Promise.all([
    compileScss([new URL('gnome-shell/gnome-shell.scss', srcDir)], fixResourceUrls),
    compileScss([new URL('gnome-shell/gnome-shell-dark.scss', srcDir)], fixResourceUrls),
    compileScss([new URL('gnome-shell/gnome-shell-light.scss', srcDir)], fixResourceUrls),
  ]);
}

// url('resource:///org/gnome/shell/theme/checkbox-off-light.svg')
// results
// url('checkbox-off-light.svg')
function fixResourceUrls(css: string): string {
  const ast: csstree.CssNode = csstree.parse(css);
  csstree.walk(ast, (node) => {
    if (node.type === 'Url') {
      node.value = node.value.replace(/^resource:\/\/\/org\/gnome\/shell\/theme\//, '');
    }
  });
  return csstree.generate(ast);
}

export async function compile(): Promise<void[]> {
  return Promise.all([compileColors(), compileShell()]);
}

await compile();
