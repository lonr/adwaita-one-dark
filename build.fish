#! /usr/bin/fish
echo Generating the css...

mkdir -p themes/Adwaita-One-Dark/gtk-3.0
mkdir -p themes/Shell-Adwaita-One-Dark/gnome-shell

sassc -M -t compact adwaita/gtk-contained-dark.scss themes/Adwaita-One-Dark/gtk-3.0/gtk-contained-dark.css
echo '@import url("./gtk-contained-dark.css");' > themes/Adwaita-One-Dark/gtk-3.0/gtk.css
cp -r adwaita/assets themes/Adwaita-One-Dark/gtk-3.0

sassc -a gnome-shell/gnome-shell.scss themes/Shell-Adwaita-One-Dark/gnome-shell/gnome-shell.css
cp gnome-shell/pad-osd.css themes/Shell-Adwaita-One-Dark/gnome-shell/pad-osd.css
