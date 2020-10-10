#! /usr/bin/fish
echo Removing old outputs...

rm -rf Adwaita-One-Dark/gnome-shell/
rm -rf Adwaita-One-Dark/gtk-3.0/

echo Generating the GNOME Shell theme...

mkdir -p Adwaita-One-Dark/gnome-shell
sassc src/gnome-shell/gnome-shell.scss Adwaita-One-Dark/gnome-shell/gnome-shell.css
cp src/gnome-shell/pad-osd.css Adwaita-One-Dark/gnome-shell/pad-osd.css

echo Generating the GTK theme...

mkdir -p Adwaita-One-Dark/gtk-3.0
cp src/gtk-3.0/_drawing.scss src/libhandy-themes/
cp src/gtk-3.0/_colors.scss src/libhandy-themes/

sassc -M -t compact src/gtk-3.0/gtk-contained-dark.scss Adwaita-One-Dark/gtk-3.0/gtk.css
cp -r src/gtk-3.0/assets Adwaita-One-Dark/gtk-3.0

echo done.
