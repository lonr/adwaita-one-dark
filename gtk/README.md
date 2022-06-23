# Adwaita One Dark

- [x] GNOME Shell theme
- [ ] GTK 2 theme
- [x] CSS files(`colors/gtk*.css`) helping recolor adw-gtk3 and libadwaita/GTK 4 theme
- [ ] GtkSourceView

[adw-gtk3](https://github.com/lassekongo83/adw-gtk3#customizing) and [libadwaita(GTK 4)](https://news.ycombinator.com/item?id=28940373) now support recoloring named colors, so we don't provide pre-compiled GTK 3/4 themes but only necessary css files for recoloring.

## Install

Download `Adwaita-One-Dark.tar.xz` from [releases](https://github.com/lonr/adwaita-one-dark/releases) and extract the folder to `~/.local/share/themes`(or `/usr/share/themes`).

Also download [adw-gtk3](https://github.com/lassekongo83/adw-gtk3/releases) and extract it to `~/.local/share/themes`(or `/usr/share/themes`).

Install [GNOME Tweaks](https://wiki.gnome.org/Apps/Tweaks) and [User Themes Extension](https://extensions.gnome.org/extension/19/user-themes/).

Open Tweaks and change `Appearance/Shell` and `Appearance/Legacy Applications`（select adw-gtk3 or adw-gtk3-dark）.

To recolor adw-gtk3 and libadwaita, create following symbolic links: (replace `~/.local/share/themes` to `/usr/share/themes` if you installed there)

```sh
ln -s ~/.local/share/themes/Adwaita-One-Dark/colors/gtk-dark.css ~/.config/gtk-4.0/gtk.css
ln -s ~/.local/share/themes/Adwaita-One-Dark/colors/gtk-dark.css ~/.config/gtk-3.0/gtk.css
```

## Thanks to

- [GTK](https://github.com/GNOME/gtk)
- [One Dark UI of Atom](https://atom.io/themes/one-dark-ui)
- [One Dark Pro - a wonderful VS Code theme](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
- [adw-gtk3](https://github.com/lassekongo83/adw-gtk3), [adw-colors](https://github.com/lassekongo83/adw-colors)
- [Ubuntu Yaru theme suite](https://github.com/ubuntu/yaru)
