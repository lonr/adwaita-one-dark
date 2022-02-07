import { join } from 'path';
import { downloadAndUntar } from '../helpers/download';

const upstreamRoot = join(__dirname, 'upstream');

const gtk2AdwaitaTarUrl =
  'https://gitlab.gnome.org/GNOME/gnome-themes-extra/-/archive/master/gnome-themes-extra-master.tar?path=themes/Adwaita-dark/gtk-2.0';
const gtk3AdwaitaTarUrl =
  'https://gitlab.gnome.org/GNOME/gtk/-/archive/gtk-3-24/gtk-gtk-3-24.tar?path=gtk/theme/Adwaita';
const gtk4AdwaitaTarUrl =
  'https://gitlab.gnome.org/GNOME/gtk/-/archive/gtk-4-4/gtk-gtk-4-4.tar?path=gtk/theme/Default';
const libhandyTarUrl =
  'https://gitlab.gnome.org/GNOME/libhandy/-/archive/libhandy-1-2/libhandy-libhandy-1-2.tar?path=src/themes';

export function syncGtk2Adwaita() {
  return downloadAndUntar(gtk2AdwaitaTarUrl, {
    C: join(upstreamRoot, 'gtk-2.0'),
    strip: 4,
  });
}

export function syncGtk3Adwaita() {
  return downloadAndUntar(gtk3AdwaitaTarUrl, {
    C: join(upstreamRoot, 'gtk-3.0'),
    strip: 4,
  });
}

export function syncGtk4Adwaita() {
  return downloadAndUntar(gtk4AdwaitaTarUrl, {
    C: join(upstreamRoot, 'gtk-4.0'),
    strip: 4,
  });
}

export function syncLibhandy() {
  return downloadAndUntar(libhandyTarUrl, {
    C: join(upstreamRoot, 'libhandy'),
    strip: 2,
  });
}

export function syncGtk() {
  return Promise.all([
    syncGtk2Adwaita(),
    syncGtk3Adwaita(),
    syncLibhandy(),
    syncGtk4Adwaita(),
  ]);
}

syncGtk().then(console.log);
