import {
  argbFromHex,
  hexFromArgb,
  Blend,
  TonalPalette,
  CorePalette
} from '@material/material-color-utilities';

export type Hex = `#${string}`;

export type Seed = {
  value: number;
  name: string;
  blend: boolean;
};

export interface HexPalette {
  tone: (tone: number) => Hex;
}

export type RolesGroup<R extends string = string> = Record<R, Hex>;

export type Roles<
  T extends string = string,
  R = T extends 'regular'
    ? RegularRoles
    : T extends 'neutral'
    ? NeutralRoles
    : T extends 'neutral-variant'
    ? NeutralVariantRoles
    : T extends 'ansi-color'
    ? AnsiRoles
    : string
> = R;

export interface ThemeColor<T extends string = string> {
  type: T;
  seed?: Seed;
  light: RolesGroup<Roles<T>>;
  dark: RolesGroup<Roles<T>>;
  palette?: HexPalette;
}

export type RegularRoles = 'color' | 'onColor' | 'colorContainer' | 'onColorContainer';

export type RegularGroup = RolesGroup<RegularRoles>;

export type RegularColor = ThemeColor;

export type NeutralRoles =
  | 'background'
  | 'onBackground'
  | 'surface'
  | 'onSurface'
  | 'shadow'
  | 'inverseSurface'
  | 'inverseOnSurface'
  | 'inversePrimary';

export type NeutralGroup = RolesGroup<NeutralRoles>;

export type NeutralColor = ThemeColor<'neutral'>;

export type NeutralVariantRoles = 'surfaceVariant' | 'onSurfaceVariant' | 'outline';

export type NeutralVariantGroup = RolesGroup<NeutralVariantRoles>;

export type NeutralVariantColor = ThemeColor<'neutral-variant'>;

export type AnsiRoles = 'color' | 'colorBright';

export type AnsiGroup = RolesGroup<AnsiRoles>;

export type AnsiColor = ThemeColor<'ansi-color'>;

export interface CoreColors {
  primary: RegularColor;
  secondary: RegularColor;
  tertial: RegularColor;
  neutral: NeutralColor;
  neutralVariant: NeutralVariantColor;
  info: RegularColor;
  warning: RegularColor;
  error: RegularColor;
}

export type TonesMap<T extends string = string> = {
  [role in T]: number | Hex;
};

/** map tones and roles  */
export interface TonesMaps<T extends string = string> {
  light: TonesMap<T>;
  dark: TonesMap<T>;
}

export type CoreTheme = CoreColors & { customColors: Record<string, ThemeColor> };

export function themeFromSourceColor(
  source: number,
  customColors: Record<string, ThemeColor> = {}
): CoreTheme {
  const MaterialPalette = CorePalette.of(source);
  return {
    primary: colorFromPalette('regular', MaterialPalette.a1),
    secondary: colorFromPalette('regular', MaterialPalette.a2),
    tertial: colorFromPalette('regular', MaterialPalette.a3),
    neutral: colorFromPalette('neutral', MaterialPalette.n1),
    neutralVariant: colorFromPalette('neutral-variant', MaterialPalette.n2),
    info: colorFromPalette('regular', TonalPalette.fromInt(argbFromHex('#2ec27e'))),
    warning: colorFromPalette('regular', TonalPalette.fromInt(argbFromHex('#e5a50a'))),
    error: colorFromPalette('regular', MaterialPalette.error),

    customColors: customColors
  };
}

export function groupFromTonesMap<T extends string>(
  palette: TonalPalette,
  tonesMap: TonesMap<T>
): RolesGroup<T> {
  return Object.fromEntries(
    Object.entries(tonesMap).map(([role, toneOrColor]) => [
      role,
      typeof toneOrColor === 'number' ? hexFromArgb(palette.tone(toneOrColor)) : toneOrColor
    ])
  ) as RolesGroup<T>;
}

export function regularColor(
  palette: TonalPalette,
  tonesMaps: TonesMaps<RegularRoles> = {
    light: {
      color: 40,
      onColor: 100,
      colorContainer: 90,
      onColorContainer: 10
    },
    dark: { color: 80, onColor: 20, colorContainer: 30, onColorContainer: 90 }
  }
): RegularColor {
  return {
    type: 'regular',
    light: groupFromTonesMap(palette, tonesMaps.light),
    dark: groupFromTonesMap(palette, tonesMaps.dark),
    palette: hexPalette(palette)
  };
}

export function neutralColor(
  palette: TonalPalette,
  tonesMaps: TonesMaps<NeutralRoles> = {
    light: {
      background: 99,
      onBackground: 10,
      surface: 99,
      onSurface: 10,
      shadow: 0,
      inverseSurface: 20,
      inverseOnSurface: 95,
      inversePrimary: 80
    },
    dark: {
      background: 10,
      onBackground: 90,
      surface: 10,
      onSurface: 90,
      shadow: 0,
      inverseSurface: 90,
      inverseOnSurface: 20,
      inversePrimary: 40
    }
  }
): NeutralColor {
  return {
    type: 'neutral',
    light: groupFromTonesMap(palette, tonesMaps.light),
    dark: groupFromTonesMap(palette, tonesMaps.dark),
    palette: hexPalette(palette)
  };
}

export function neutralVariantColor(
  palette: TonalPalette,
  tonesMaps: TonesMaps<NeutralVariantRoles> = {
    light: {
      surfaceVariant: 90,
      onSurfaceVariant: 30,
      outline: 50
    },
    dark: {
      surfaceVariant: 30,
      onSurfaceVariant: 80,
      outline: 60
    }
  }
): NeutralVariantColor {
  return {
    type: 'neutral-variant',
    light: groupFromTonesMap(palette, tonesMaps.light),
    dark: groupFromTonesMap(palette, tonesMaps.dark),
    palette: hexPalette(palette)
  };
}

export function ansiColor(
  palette: TonalPalette,
  tonesMaps: TonesMaps<AnsiRoles> = {
    light: {
      color: 40,
      colorBright: 90
    },
    dark: { color: 40, colorBright: 90 }
  }
): AnsiColor {
  return {
    type: 'ansi-color',
    light: groupFromTonesMap(palette, tonesMaps.light),
    dark: groupFromTonesMap(palette, tonesMaps.dark)
  };
}

export function colorFromPalette<T extends string>(
  type: T,
  palette: TonalPalette,
  tonesMaps?: TonesMaps<Roles<T>>
): ThemeColor<T> {
  if (tonesMaps) {
    return {
      type: type,
      light: groupFromTonesMap(palette, tonesMaps.light),
      dark: groupFromTonesMap(palette, tonesMaps.dark)
    };
  }
  switch (type) {
    case 'neutral':
      return neutralColor(palette) as ThemeColor<T>;
    case 'neutral-variant':
      return neutralVariantColor(palette) as ThemeColor<T>;
    case 'ansi-color':
      return ansiColor(palette) as ThemeColor<T>;
    case 'regular':
    default:
      return regularColor(palette) as ThemeColor<T>;
  }
}

export function colorFromSeed(type: string, seed: Seed, source?: number, tonesMaps?: TonesMaps): ThemeColor {
  let value = seed.value;
  if (seed.blend && source !== undefined) {
    value = Blend.harmonize(seed.value, source);
  }
  const palette = TonalPalette.fromInt(value);
  return { ...colorFromPalette(type, palette, tonesMaps), seed };
}

export function hexPalette(tonalPalette: TonalPalette): HexPalette {
  return { tone: (tone: number) => hexFromArgb(tonalPalette.tone(tone)) as Hex };
}
