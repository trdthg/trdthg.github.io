export LANG=zh_CN.UTF-8
export LANGUAGE=zh_CN:en_US

export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"

xrdb -merge ~/.Xresources
set bell-style none
exec i3

eval "$(/usr/bin/gnome-keyring-daemon --start --components=pkcs11,secrets,ssh)"
export SSH_AUTH_SOCK