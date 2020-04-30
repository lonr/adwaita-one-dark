#! /usr/bin/fish
echo Generating the css...

mkdir -p Adwaita-One-Dark/gtk-3.0
mkdir -p Adwaita-One-Dark/gnome-shell

sassc -M -t compact src/gtk-3.0/gtk-contained-dark.scss Adwaita-One-Dark/gtk-3.0/gtk-contained-dark.css
echo '@import url("./gtk-contained-dark.css");' > Adwaita-One-Dark/gtk-3.0/gtk.css
cp -r src/gtk-3.0/assets Adwaita-One-Dark/gtk-3.0

sassc -a src/gnome-shell/gnome-shell.scss Adwaita-One-Dark/gnome-shell/gnome-shell.css
cp src/gnome-shell/pad-osd.css Adwaita-One-Dark/gnome-shell/pad-osd.css
