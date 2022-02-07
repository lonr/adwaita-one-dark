import { join } from 'path';
import { downloadAndUntar, downloadFile } from '../helpers/download';

const gnomeShellBranch = 'gnome-40';

const gnomeShellThemeTarUrl =
  `https://gitlab.gnome.org/GNOME/gnome-shell/-/archive/${gnomeShellBranch}/gnome-shell-${gnomeShellBranch}.tar?path=data/theme`;

export function syncGnomeShellTheme() {
  downloadAndUntar(gnomeShellThemeTarUrl, {
    C: join(__dirname, 'upstream'),
    strip: 2,
  });
}

const gnomeGresourceSpecTarUrl =
  `https://gitlab.gnome.org/GNOME/gnome-shell/-/raw/${gnomeShellBranch}/data/gnome-shell-theme.gresource.xml?inline=false`;

const gnomeGresourceBuildTarUrl =
  `https://gitlab.gnome.org/GNOME/gnome-shell/-/raw/${gnomeShellBranch}/data/meson.build?inline=false`;

export function syncGresourceSpec() {
  const dir = join(__dirname, 'upstream');
  return Promise.all([
    downloadFile(gnomeGresourceSpecTarUrl, dir),
    downloadFile(gnomeGresourceBuildTarUrl, dir),
  ]);
}

syncGnomeShellTheme();
syncGresourceSpec();
