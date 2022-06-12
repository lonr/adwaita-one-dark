import { argbFromHex, TonalPalette } from '@material/material-color-utilities';
import merge from 'deepmerge';
import isMergeableObject from 'is-mergeable-object';
import { AnsiColor, ansiColor, Hex, CoreTheme, themeFromSourceColor } from './core_theme';
import { RecursivePartial } from './typing';

export const themeName: string = 'One Dark';

const primary: Hex = '#4d78cc';

const overwritten: RecursivePartial<CoreTheme> = {
  primary: {
    dark: {
      color: '#4d78cc',
      onColor: '#f9f9ff'
    }
  },
  neutral: {
    dark: {
      background: '#282c34',
      onBackground: '#abb2bf',
      surface: '#21252b'
    }
  }
};

export interface AnsiColors {
  [key: string]: AnsiColor;
}

const ansiColors: AnsiColors = Object.fromEntries(
  Object.entries({
    black: ['#3f4451', '#4f5666'],
    white: ['#d7dae0', '#e6e6e6'],
    red: ['#e05561', '#ff616e'],
    green: ['#8cc265', '#a5e075'],
    yellow: ['#d18f52', '#f0a45d'],
    blue: ['#4aa5f0', '#4dc4ff'],
    magenta: ['#c162de', '#de73ff'],
    cyan: ['#42b3c2', '#4cd1e0']
  } as const).map(([name, [color, colorBright]]) => [
    name,
    ansiColor(TonalPalette.fromInt(argbFromHex(color)), {
      light: { color, colorBright },
      dark: { color, colorBright }
    })
  ])
);

const coreTheme: CoreTheme = themeFromSourceColor(argbFromHex(primary), { ...ansiColors });

export const theme: CoreTheme = merge(coreTheme, overwritten, {
  isMergeableObject: (o: unknown) => !(o instanceof TonalPalette) && isMergeableObject(o)
}) as CoreTheme;

export * from './core_theme';

export interface AnsiHexColors {
  [key: string]: Hex;
}

export const ansi: AnsiHexColors = {
  black: theme.customColors.black.light.color,
  red: theme.customColors.red.light.color,
  green: theme.customColors.green.light.color,
  yellow: theme.customColors.yellow.light.color,
  blue: theme.customColors.blue.light.color,
  magenta: theme.customColors.magenta.light.color,
  cyan: theme.customColors.cyan.light.color,
  white: theme.customColors.white.light.color,
  blackBright: theme.customColors.black.light.colorBright,
  redBright: theme.customColors.red.light.colorBright,
  greenBright: theme.customColors.green.light.colorBright,
  yellowBright: theme.customColors.yellow.light.colorBright,
  blueBright: theme.customColors.blue.light.colorBright,
  magentaBright: theme.customColors.magenta.light.colorBright,
  cyanBright: theme.customColors.cyan.light.colorBright,
  whiteBright: theme.customColors.white.light.colorBright
};
