import { copy } from 'fs-extra';
import fg from 'fast-glob';

const files = fg.sync([
  'templates/**/README.md',
  'templates/gnome-shell/**/*.svg',
  'templates/gnome-shell/gnome-shell.css',
  'templates/gnome-shell/gnome-shell-light.css',
  'templates/gnome-shell/gnome-shell-dark.css',
  'templates/colors/gtk-dark.css',
  'templates/colors/gtk.css',
  'templates/gtk-2.0/gtkrc',
  'templates/gtk-2.0/*.rc',
  'templates/gtk-2.0/**/*.png',
]);

await Promise.all(
  files.map(async (file) => {
    let dest: string;
    if (file === 'README.md') {
      dest = 'build/README.md';
    } else {
      dest = file.replace(/^templates\//, 'build/');
    }
    await copy(file, dest);
    return;
  }),
);
