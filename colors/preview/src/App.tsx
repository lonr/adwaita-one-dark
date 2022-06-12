import * as React from 'react';
import { useEffect } from 'react';
import { argbFromHex, Hct } from '@material/material-color-utilities';
import { theme, ThemeColor, Hex, RolesGroup } from 'palette';

interface ColorProps {
  name: string;
  color: ThemeColor<string>;
}

const findProperTextColor = (roleName: string, rolesGroup: RolesGroup): Hex => {
  let guessRole: string;

  if (roleName.startsWith('on')) {
    guessRole = roleName.slice(2).toLowerCase();
  } else {
    guessRole = 'on' + roleName.charAt(0).toUpperCase() + roleName.slice(1);
  }
  if (rolesGroup[guessRole]) {
    return rolesGroup[guessRole];
  }

  const hct = Hct.fromInt(argbFromHex(rolesGroup[roleName]));

  if (hct.tone < 50) {
    return '#fff';
  } else {
    return '#000';
  }
};

const Color = ({ name, color }: ColorProps): JSX.Element => {
  return (
    <>
      <h2>{name}</h2>
      <h3>light:</h3>
      {Object.entries(color.light).map(([role, hex]) => (
        <div key={role} style={{ background: hex, color: findProperTextColor(role, color.light) }}>
          {role + ': ' + hex}
        </div>
      ))}
      <h3>dark:</h3>
      {Object.entries(color.dark).map(([role, hex]) => (
        <div key={role} style={{ background: hex, color: findProperTextColor(role, color.dark) }}>
          {role + ': ' + hex}
        </div>
      ))}
    </>
  );
};

export const App = (): JSX.Element => {
  useEffect(() => {
    console.log(theme);
  });
  return (
    <>
      <h1>Palette</h1>
      <main>
        {Object.entries(theme).map(([name, color]) => {
          if (name !== 'customColors') {
            return <Color key={name} name={name} color={color as ThemeColor} />;
          }
        })}
        {Object.entries(theme.customColors).map(([name, color]) => {
          return <Color key={name} name={'custom: ' + name} color={color as ThemeColor} />;
        })}
        <h2>theme json</h2>
        <pre>
          <code>{`${JSON.stringify(theme, null, 2)}`}</code>
        </pre>
      </main>
    </>
  );
};
