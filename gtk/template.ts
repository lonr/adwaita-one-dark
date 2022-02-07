// render `.njk` templates
import { findAndRenderTemplates } from '../helpers/template';
import palette from '../palette/palette.json';
import { join } from 'path';

function getSrcPath(dir: string) {
  return join(__dirname, 'src', dir);
}

export async function renderGtk3Templates() {
  return findAndRenderTemplates(getSrcPath('gtk-3.0'), palette);
}

export async function renderGtk2Templates() {
  return findAndRenderTemplates(getSrcPath('gtk-2.0'), palette);
}


renderGtk3Templates().then(console.log);
