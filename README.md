# Adwaita One Dark

[Adwaita](https://github.com/GNOME/gtk/tree/mainline/gtk/theme/Adwaita)(A Gnome theme) with the [One Dark color scheme](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)

Usage:

1. [Download](https://github.com/lonr/adwaita-one-dark/releases) and then unzip `Adwaita-One-Dark` to `~/.local/share/themes`(or `/usr/share/themes`)
2. Install [GNOME Tweaks](https://wiki.gnome.org/Apps/Tweaks) and [User Themes Extension](https://extensions.gnome.org/extension/19/user-themes/)
3. Open Tweaks and select `Applications` and `Shell` theme
4. <kbd>Alt</kbd> + <kbd>F2</kbd>; input `r`; enter to refresh

## Changes

- `$bg_color: #282c34;`
- `$base_color: #21252b;`
- `$selected_bg_color: #4d78cc;`

## Releases

- Fedora 32
  - [GNOME Shell 3.36.1](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/3.36.1/data/theme)
  - [Adwaita(GTK) 3.24.18](https://gitlab.gnome.org/GNOME/gtk/-/tree/3.24.18/gtk/theme/Adwaita)

## Notes

- `gnome-shell --version` eg. 3.34.1
- Adwaita is a part of the GTK repo `dnf list --installed | grep gtk` eg.  3.24.13

Some apps use `$sidebar_bg_color`(Nautilus) for sidebars, but some apps use `$base_color`(Tweaks)

repos

1. [Application theme](https://gitlab.gnome.org/GNOME/gtk/tree/master/gtk/theme/Adwaita)
2. [Gnome Shell theme](https://gitlab.gnome.org/GNOME/gnome-shell/tree/master/data/theme)

palette

one light:
```less
// Config -----------------------------------
@syntax-hue:          230;
@syntax-saturation:    1%;
@syntax-brightness:   98%;

// Monochrome -----------------------------------
@mono-1: hsl(@syntax-hue, 8%, 24%); // #383a42
@mono-2: hsl(@syntax-hue, 6%, 44%); // #696c77
@mono-3: hsl(@syntax-hue, 4%, 64%); // #a0a1a7

// Colors -----------------------------------
@hue-1:   hsl(198, 99%, 37%); // <-cyan #0184bc
@hue-2:   hsl(221, 87%, 60%); // <-blue #4078f2
@hue-3:   hsl(301, 63%, 40%); // <-purple #a626a4
@hue-4:   hsl(119, 34%, 47%); // <-green #50a14f

@hue-5:   hsl(  5, 74%, 59%); // <-red 1 #e45649
@hue-5-2: hsl(344, 84%, 43%); // <-red 2 #ca1243

@hue-6:   hsl(41, 99%, 30%); // <-orange 1 #986801
@hue-6-2: hsl(41, 99%, 38%); // <-orange 2 #c18401

// Base colors -----------------------------------
@syntax-fg:     @mono-1; // #383a42
@syntax-bg:     hsl(@syntax-hue, @syntax-saturation, @syntax-brightness); // #fafafa
@syntax-gutter: darken(@syntax-bg, 36%); // #9d9d9f
@syntax-guide:  fade(@syntax-fg, 20%);
@syntax-accent: hsl(@syntax-hue, 100%, 66% ); // #526fff
```
