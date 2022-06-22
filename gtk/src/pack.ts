// import { copy } from 'node:fs/promise';
import { copy } from 'fs-extra';
import fg from 'fast-glob';

fg.sync([
  'src/*/README.md',
  'src/gnome-shell/**/*.svg',
  'src/gnome-shell/gnome-shell.css',
  'src/gtk-3.0/assets/**/*',
  'src/gtk-3.0/gtk.css',
  'src/gtk-3.0/gtk-dark.css',
  'src/gtk-4.0/assets/**/*',
  'src/gtk-4.0/gtk.css',
  'src/gtk-4.0/gtk-dark.css'
]).forEach(async (file) => {
  await copy(file, file.replace(/^src\//, 'dist/'));
});
