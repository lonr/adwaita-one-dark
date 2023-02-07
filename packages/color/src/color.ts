/* eslint-disable @typescript-eslint/no-explicit-any */
import { lighten as _lighten, darken as _darken, toHex } from 'khroma';

function hexify<T extends (...args: any[]) => string>(fn: T): (...args: Parameters<T>) => string {
  return function (...args: Parameters<T>) {
    return toHex(fn(...args));
  };
}

export const context: Record<string, (...args: any) => any> = {
  lighten: hexify(_lighten),
  darken: hexify(_darken),
  toHex,
};

export const filters: Record<string, (...args: any) => any> = {
  lighten: hexify(_lighten),
  darken: hexify(_darken),
  toHex,
};
