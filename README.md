# Adwaita One Dark

[Adwaita](https://github.com/GNOME/gtk/tree/mainline/gtk/theme/Adwaita)(A GNOME theme) with the [One Dark color scheme](https://github.com/Binaryify/OneDark-Pro/blob/master/themes/OneDark-Pro.json)

## How to use

1. [Download](https://github.com/lonr/adwaita-one-dark/releases) and then unzip `Adwaita-One-Dark` to `~/.local/share/themes`(or `/usr/share/themes`)
2. Install [GNOME Tweaks](https://wiki.gnome.org/Apps/Tweaks) and [User Themes Extension](https://extensions.gnome.org/extension/19/user-themes/)
3. Open Tweaks and select `Applications` theme and `Shell` theme
4. <kbd>Alt</kbd> + <kbd>F2</kbd>; input `r`; <kbd>Enter</kbd> to refresh

## Colors I changed

- `$base_color: #21252b;`
- `$bg_color: #282c34;`
- `$selected_bg_color: #4d78cc;`

## Versions

- You can get both versions via GNOME Tweaks -> "About Tweaks"
- Get GNOME Shell version `gnome-shell --version` eg. `3.38.0`
- Get GTK version `dnf list --installed | grep '^gtk3'` eg. `3.24.23`
- Fedora 33 Beta
  - [GNOME Shell 3.38.0](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/3.38.0/data/theme)
  - [Adwaita(GTK) 3.24.23](https://gitlab.gnome.org/GNOME/gtk/-/tree/3.24.23/gtk/theme/Adwaita)
  - [Handy 1.0.0](https://gitlab.gnome.org/GNOME/libhandy/-/tree/1.0.0/src/themes)
- Fedora 32
  - [GNOME Shell 3.36.1](https://gitlab.gnome.org/GNOME/gnome-shell/-/tree/3.36.1/data/theme)
  - [Adwaita(GTK) 3.24.18](https://gitlab.gnome.org/GNOME/gtk/-/tree/3.24.18/gtk/theme/Adwaita)

## How to build by hand

You need install [SassC](https://github.com/sass/sassc) first.(`sudo dnf install sassc` in Fedora)

To build GNOME Shell:

1. Choose a branch and download [the directory of GNOME Shell theme](https://gitlab.gnome.org/GNOME/gnome-shell/tree/master/data/theme), unzip and move the files to `src/gnome-shell`
2. Modify `src/gnome-shell/gnome-shell-sass/_colors.scss`(or whatever you want)
3. Run commands from root of the project
   1. Delete old output `rm -rf ./Adwaita-One-Dark/gnome-shell`
   2. Generate the css file 
      - `mkdir -p Adwaita-One-Dark/gnome-shell/`
      - `sassc src/gnome-shell/gnome-shell.scss Adwaita-One-Dark/gnome-shell/gnome-shell.css`
   3. Copy `pad-osd.css` too `cp src/gnome-shell/pad-osd.css Adwaita-One-Dark/gnome-shell/pad-osd.css`(I don't know if the file is useful)
4. Note that the assets in `gnome-shell` don't need to be included(the theme will use assets by things like `url("resource:///org/gnome/shell/theme/dash-placeholder.svg")` )

To build GTK theme:

1. Choose a branch and download [the directory of GTK theme](https://gitlab.gnome.org/GNOME/gtk/tree/master/gtk/theme/Adwaita), unzip and move the files inside to `src/gtk-3.0`
2. Choose a branch and download [the directory of Handy theme for Adwaita](https://gitlab.gnome.org/GNOME/libhandy/-/tree/master/src/themes), unzip and move the files inside to `src/libhandy-themes`
3. Modify `src/gtk-3.0/_colors.scss`(or whatever you want)
4. Run commands from root of the project
   1. Delete old output `rm -rf ./Adwaita-One-Dark/gtk-3.0`
   2. Copy `_drawing.scss` and modified `_colors.scss` to `src/libhandy-themes`
      - `cp src/gtk-3.0/_drawing.scss src/libhandy-themes/`
      - `cp src/gtk-3.0/_colors.scss src/libhandy-themes/`
   3. Remove `src/libhandy-themes/Adwaita-dark.css` to avoid a SassC import error
   4. Edit `src/gtk-3.0/gtk-contained-dark.scss`: add `@import '../libhandy-themes/Adwaita-dark';` above `@import 'colors-public';`
   5. Generate the css file 
      - `mkdir -p Adwaita-One-Dark/gtk-3.0`
      - `sassc -M -t compact src/gtk-3.0/gtk-contained-dark.scss Adwaita-One-Dark/gtk-3.0/gtk.css`
   6. Copy the assets `cp -r src/gtk-3.0/assets Adwaita-One-Dark/gtk-3.0`

## Notes

Some apps use `$sidebar_bg_color`(Nautilus) for sidebars, but some apps use `$base_color`(Tweaks)

TODO: replace assets references in GTK theme

<!-- palette

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
``` -->

<!-- https://gitlab.com/gitlab-org/gitlab-foss/-/issues/62037 -->
