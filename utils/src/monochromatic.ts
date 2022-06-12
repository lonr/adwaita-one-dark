import chroma, { Color, scale } from 'chroma-js';

// https://gka.github.io/chroma.js/
// https://github.com/bgrins/TinyColor#monochromatic

export function monochromatic(...args: Parameters<typeof _monochromatic>): string[] {
  return _monochromatic(...args).map((color) => color.hex());
}

function _monochromatic(colorString: string, results: number = 10, maxFactor: number = 0.7): Color[] {
  // 0 … 5 … 9 input color will be at 5
  const color = chroma(colorString);
  const indexMiddle = Math.floor(results / 2);
  const numColorsTinten = indexMiddle;
  const numColorsShaden = results - indexMiddle - 1;

  return new Array(results).fill(undefined).map((__, index) => {
    if (index < indexMiddle) {
      return tints(color, maxFactor * (1 - index / numColorsTinten));
    } else if (index === indexMiddle) {
      return color;
    } else {
      return shades(color, maxFactor * ((index - indexMiddle) / numColorsShaden));
    }
  });
}

// https://stackoverflow.com/a/31325812/5783347
// https://github.com/edelstone/tints-and-shades

function tints(color: Color, factor: number): Color {
  return chroma(color.rgb().map((channel) => channel + (255 - channel) * factor));
}

function shades(color: Color, factor: number): Color {
  return chroma(color.rgb().map((channel) => channel - channel * factor));
}

export function createScale(colors: string[], results: number = 10): string[] {
  return scale(colors).colors(results);
}
