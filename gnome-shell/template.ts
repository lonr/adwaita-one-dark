import { findTemplates, renderTemplates } from '../helpers/template';
import { join } from 'path';
import palette from '../palette/palette.json';

export async function renderShellTemplates() {
  const templates = await findTemplates(join(__dirname, 'src'));
  return renderTemplates(templates, palette);
}

renderShellTemplates().then(console.log);
