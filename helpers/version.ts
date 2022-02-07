import { exec as execCps } from 'child_process';
import getosCb from 'getos';
import { promisify } from 'util';

const exec = promisify(execCps);
const getos = promisify(getosCb);

function extractVersion(input: string) {
  const matchArr = input.match(/\d+(?:\.\d+)+/);
  if (!matchArr) {
    throw new Error(`Can't find version number in '${input}'`);
  }
  return matchArr[0];
}

type AppName = 'gnomeShell' | 'gtk3' | 'gtk4' | 'libHandy';

function assignVersion(app: AppName) {
  return function ({ stdout }: { stdout: string }) {
    return { [app]: extractVersion(stdout) };
  };
}

/**
 * get an object which has a key(app name)-value(version) pair
 *
 * `({gnomeShell: 1.0.0})`
 *  */
export function getGnomeShellVersion() {
  return exec('gnome-shell --version').then(assignVersion('gnomeShell'));
}

export function getGtk3Version() {
  return exec('gtk-launch --version').then(assignVersion('gtk3'));
}

/** Now only works in Fedora or Ubuntu */
async function getPackageVersion(packageName: 'gtk3' | 'gtk4' | 'libHandy') {
  const os = await getos();
  if (os.os === 'linux') {
    let cmd = '';

    switch (os.dist) {
      case 'Fedora':
        cmd = `dnf list installed ${packageName}`;
        break;
      // have not been tested yet
      case 'Ubuntu':
        cmd = `apt list --installed ${packageName}`;
        break;
    }

    if (cmd !== '') {
      return exec(cmd).then(assignVersion(packageName));
    }
  }
  throw new Error('Only Fedora and Ubuntu are supported');
}

export async function getGtk4Version() {
  return getPackageVersion('gtk4');
}

export async function getLibHandyVersion() {
  return getPackageVersion('libHandy');
}

/**
 * get a `promise` of a versions object of GNOME Shell, GTK, and libhandy
 *
 * e.g.
 * ```js
 * ({ gnomeShell: '40.4', gtk: '3.24.30', libHandy: '1.2.3' })
 * ```
 */
export async function getVersions() {
  const versionArr = await Promise.all([
    getGnomeShellVersion(),
    getGtk3Version(),
    getGtk4Version(),
    getLibHandyVersion(),
  ]);
  return Object.assign({}, ...versionArr);
}

// getVersions().then(console.log)
