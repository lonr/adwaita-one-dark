# Adwaita One Dark

[Adwaita](https://gitlab.gnome.org/GNOME/libadwaita/-/tree/main/src/stylesheet)(the default theme of GNOME) with the [One Dark color scheme](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)

![gtk-3.0](./screenshots/gtk-3.0.png)

## Themes

- [GTK theme](gtk/README.md)
  - [x] GNOME Shell theme
  - [ ] GTK 2 theme
  - [x] GTK 3 theme. Based on [adw-gtk3](https://github.com/lassekongo83/adw-gtk3)
  - Note: [Libadwaita and adw-gtk3 can be customized with named colors.](https://github.com/lassekongo83/adw-gtk3#customizing), so we'll remove pre-compiled GTK 3/4 theme
  - [x] GTK 4 theme
  - [ ] GtkSourceView
- Terminals
  - [x] Tilix
- [ ] Tools for creating other color variants

## How to use

1. Download `Adwaita-One-Dark.zip` from [releases](https://github.com/lonr/adwaita-one-dark/releases) and then unzip `Adwaita-One-Dark` to `~/.local/share/themes`(or `/usr/share/themes`)
2. Install [GNOME Tweaks](https://wiki.gnome.org/Apps/Tweaks) and [User Themes Extension](https://extensions.gnome.org/extension/19/user-themes/)
3. Open Tweaks and change `Appearance/Shell` and `Appearance/Legacy Applications`（GTK 3）
4. To enable GTK 4 theme. The following links need to be created(replace `~/.local/share/themes` to where your themes were installed):

```sh
ln -s ~/.local/share/themes/Adwaita-One-Dark/gtk-4.0/gtk-dark.css ~/.config/gtk-4.0/gtk.css
ln -s ~/.local/share/themes/Adwaita-One-Dark/gtk-4.0/assets ~/.config/gtk-4.0/assets`
```

## Thanks to

- [GTK](https://github.com/GNOME/gtk)
- [One Dark UI of Atom](https://atom.io/themes/one-dark-ui)
- [One Dark Pro - a wonderful VS Code theme](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
- [adw-gtk3](https://github.com/lassekongo83/adw-gtk3)
- [Ubuntu Yaru theme suite](https://github.com/ubuntu/yaru)
