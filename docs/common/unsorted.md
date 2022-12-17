# Unsorted

## Vitual Camera

[Vitual Camera](https://rmsol.de/2020/04/25/v4l2/)

```sh
sudo modprobe -r v4l2loopback

sudo modprobe v4l2loopback devices=1 video_nr=21 exclusive_caps=1 card_label="Virtual Webcam"

v4l2-ctl --list-devices

ffmpeg -re -i ~/Downloads/example.mp4 -f v4l2 /dev/video21
```
