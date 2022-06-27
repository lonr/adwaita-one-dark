import { copy } from 'fs-extra';
import fg from 'fast-glob';

fg.sync([
  'src/**/README.md',
  'src/gnome-shell/**/*.svg',
  'src/gnome-shell/gnome-shell.css',
  'src/colors/gtk-dark.css',
  'src/colors/gtk.css',
  'src/gtk-2.0/gtkrc',
  'src/gtk-2.0/*.rc',
  'src/gtk-2.0/**/*.png'
]).forEach(async (file) => {
  let dest: string;
  if (file === 'README.md') {
    dest = 'dist/README.md';
  } else {
    dest = file.replace(/^src\//, 'dist/');
  }
  await copy(file, dest);
});
