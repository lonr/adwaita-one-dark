import sassVars, { JsonObject } from 'get-sass-vars';
import { readFile, writeFile } from 'fs-extra';
import { join } from 'path';
import { colorToHex } from '../helpers/color';

const paletteJsonPath = join(__dirname, 'palette.json');

function stripInitial$(propName: string) {
  return propName.replace(/^\$/, '');
}

// generate palette.json from palette.scss
export async function generateJsonPalette() {
  const scss = await readFile('./palette.scss', 'utf-8');
  const jsonObj = await sassVars(scss);
  const newJsonObj: JsonObject = {};

  Object.entries(jsonObj).forEach(([key, value]) => {
    if (typeof value === 'string') {
      try {
        value = colorToHex(value, true);
        key = stripInitial$(key);
      } catch (error) {
        // bypass declarations like `$variant: 'dark';`
        return;
      }
      newJsonObj[key] = value;
    }
  });

  await writeFile(paletteJsonPath, JSON.stringify(newJsonObj, null, 2));
}

generateJsonPalette().then(console.log);
