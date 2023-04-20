# 远程 USB


https://unix.stackexchange.com/questions/201757/how-can-i-set-up-a-usb-proxy-for-dev-ttyusb0-over-the-network
https://cygwin.com/cygwin-ug-net/using-specialnames.html#pathnames-posixdevices

## socat

- linux
  - socat
- windows
  - com2tcp
  - socat-windows

```make
get-remote-usb:
        ssh nixos "socat PTY,raw,echo=0,link=/home/trdthg/tmp/dev/ttyVUSB0 tcp:47.94.225.51:50100"
set-remote-usb:
        socat.exe /dev/ttyS11,raw,echo=0 tcp-listen:50100,reuseaddr
set-remote-usb2:
        com2tcp.bat --baud 460800 COM12 50100
set-frp:
        frpc -c C:/Users/trdth/github/frp/frpc.ini
```

## usbip

- linux: just install
- windows: usbip-win https://github.com/cezanne/usbip-win
https://usbip.sourceforge.net/

- https://www.linux-magazine.com/Issues/2018/208/Tutorial-USB-IP
- https://pluhuxc.github.io/2018/11/01/usbip.html
