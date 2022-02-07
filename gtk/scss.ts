import { compileScss } from '../helpers/scss';
import { resolveAllPath } from '../helpers/path';
import { join } from 'path';

const gtk3ScssEntries = resolveAllPath(join(__dirname, 'src', 'gtk-3.0'), [
  'gtk-dark.scss',
]);

compileScss(gtk3ScssEntries);
