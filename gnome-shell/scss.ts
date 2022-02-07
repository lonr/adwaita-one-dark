import { compileScss } from '../helpers/scss';
import { resolveAllPath } from '../helpers/path';
import { join } from 'path';

const shellScssEntries = resolveAllPath(join(__dirname, 'src/theme'), [
  'gnome-shell.scss',
  'gnome-shell-high-contrast.scss',
]);

compileScss(shellScssEntries);
