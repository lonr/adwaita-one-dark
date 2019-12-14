# Adwaita One Dark

A Gnome theme [Adwaita](https://github.com/GNOME/gtk/tree/mainline/gtk/theme/Adwaita) with the [One Dark color scheme](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)

1. Copy `themes/{Adwaita-One-Dark, Shell-Adwaita-One-Dark}` to `~/.local/share/themes`(or `/usr/share/themes`)
2. Refer [How to install themes on Fedora Workstation](https://fedoramagazine.org/tweaking-the-look-of-fedora-workstation-with-themes/) to apply then

## Changes

- `$bg_color: #282c34;`
- `$base_color: #21252b;`
- `$selected_bg_color: #4d78cc;`

## Notes

- `gnome-shell --version` 3.34.1
- GTK 3.24.13

Some apps use `$sidebar_bg_color`(Nautilus) for sidebar, some apps use `$base_color`(Tweaks)

repos

1. [Application theme](https://gitlab.gnome.org/GNOME/gtk/tree/master/gtk/theme/Adwaita)
2. [Gnome Shell theme](https://gitlab.gnome.org/GNOME/gnome-shell/tree/master/data/theme)
