// render `.njk` templates
import { renderTemplates } from '../helpers/template';
import palette from '../palette/palette.json';
import { join } from 'path';

const templatePath = join(__dirname, 'src/one-dark.json.njk');

export function renderTilixColorScheme() {
  return renderTemplates([templatePath], palette);
}

renderTilixColorScheme().then(console.log);
