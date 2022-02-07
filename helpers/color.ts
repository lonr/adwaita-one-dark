import cs from 'color-string';

export function colorToHex(colorString: string, removeAlphaChannel = false) {
  const parsedColor = cs.get(colorString);
  if (parsedColor === null) {
    throw new Error(`color string ${colorString} can't be parsed correctly`);
  }
  if (removeAlphaChannel) {
    parsedColor.value[3] = 1;
  }
  return cs.to.hex(parsedColor.value);
}

/**
 * make the color opaque
 * @param fgColor foreground color probably with a alpha channel
 * @param bgColor a opaque background. `#000` used as a default because we mainly create a dark theme
 *
 * https://en.wikipedia.org/wiki/Alpha_compositing
 * https://www.npmjs.com/package/color-blend
 */
export function blend(fgColor: string, bgColor = '#000') {
  const fgRgba = cs.get(fgColor);
  if (fgRgba === null) {
    throw new Error(`fgColor: ${fgColor} is not a valid color string`);
  }
  const fgAlpha = fgRgba.value[3];
  // already a opaque color
  if (fgAlpha === 1) {
    return fgColor;
  }
  const bgRgba = cs.get(bgColor);
  if (bgRgba === null || bgRgba.value[3] !== 1) {
    throw new Error(
      `fgColor: ${bgColor} is not a valid opaque color string`,
    );
  }
  const resultRgbaValue = [0, 0, 0, 1];
  for (let i = 0; i < 3; i += 1) {
    resultRgbaValue[i] =
      fgRgba.value[i] * fgAlpha + bgRgba.value[i] * (1 - fgAlpha);
  }
  return cs.to.hex(resultRgbaValue);
}
