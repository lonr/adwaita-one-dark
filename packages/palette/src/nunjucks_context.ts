import { theme, themeName, ansi, Hex } from './theme';

type NunjucksContext = {
  themeName: string;
  ansi: { [key: string]: Hex };
} & typeof theme;

export const context: NunjucksContext = {
  themeName,
  ...theme,
  ansi,
};
