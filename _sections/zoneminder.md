## Install Zoneminder

I recommend to [install zoneminder with Docker](https://github.com/ZoneMinder/ZoneMinder/wiki/Docker)


## Configure Zoneminder

### Zoneminder settings for Xiaomi Ants Webcamera

Function: Mocord (will record only if motion detected)

Source type: FFMpeg

Source Path: ``rtsp://10.132.193.9/ch0.h264`` or ``rtsp://10.132.193.9/ch1.h264`` (low quality)

Remote Method: RTP/RTSP

Capture Width (pixels): 1280 / 640

Capture Height (pixels): 720 / 380

[More details abouta available monitor settings](http://zoneminder.readthedocs.io/en/latest/userguide/definemonitor.html)

![general tab](http://i.imgur.com/Y0ma5pl.png)

![source tab](http://i.imgur.com/HMxCVoF.png)


## Getting camshots

### ffmpeg

```
ffmpeg -an -hide_banner -loglevel panic -i rtsp://10.132.193.9//ch0.h264 -f image2 -vframes 1 test3.jpg
```

If you plan to use VPN you definetely need `--network=host` 

```
docker run -d -it -v $(pwd):/tmp/workdir --network=host jrottenberg/ffmpeg:3.3-alpine -hide_banner -loglevel debug -i rtsp://10.132.193.9//ch0.h264 -f image2 -vframes 1 latest.jpg
```

If you need to execute ffmpeg manually:

```
docker run -it -v $(pwd):/tmp/workdir --network=host --entrypoint /bin/sh jrottenberg/ffmpeg:3.3-alpine
# ffmpeg -hide_banner -loglevel error -i rtsp://10.132.193.9//ch0.h264 -f image2 -vf 1 -vf fps=1/3 latest.jpg
```

Generate a screenshot every 3 seconds (use `-y` and `-vf fps` options)

```
docker run -d -it -v $(pwd):/tmp/workdir --network=host jrottenberg/ffmpeg:3.3-alpine -hide_banner -loglevel debug -i rtsp://10.132.193.9//ch0.h264 -f image2 -vf 1 -vf fps=1/3 image_%02d.jpg
```

Outputting a single image that is continuously overwritten with new images (`-update 1` option)

```
docker run -d -it -v $(pwd):/tmp/workdir --network=host jrottenberg/ffmpeg:3.3-alpine -hide_banner -loglevel debug -i rtsp://10.132.193.9//ch0.h264 -f image2 -vf fps=1/3 -y -update 1 latest.jpg
```


If outputting a single image you need to include `-frames:v 1`

If outputting a series of images you need to use the proper naming pattern as described in the image muxer documentation. For example, `output_%03d.png` will make a series named output_001.png, output_002.png, output_003.png, etc.

If outputting a single image that is continuously overwritten with new images, add `-update 1`. 


### vlc 

use live555 demux for rtsp urls

test: `vlc -vvv --vout=dummy --aout=dummy --start-time=0 --stop-time=1 rtsp://10.132.193.9//ch0.h264 vlc://quit`

vlc rtsp://10.132.193.9//ch0.h264 -v --rate=1 --video-filter=scene --vout=dummy --aout=dummy --start-time=0 --stop-time=1 --scene-format=jpg --scene-ratio=1 --scene-prefix=snap vlc://quit

### openRTSP

Installation: `livemedia-utils`

openRTSP -D 1 -c -B 10000000 -b 10000000 -Q -F cam_eight -d 28800 -P 900 -t rtsp://10.132.193.9//ch1.h264

https://superuser.com/questions/766437/capture-rtsp-stream-from-ip-camera-and-store

## Configure VPN

1) Download VPN config: `https://docs.r61.net/system/files/client_sfedu.ovpn`

2) check it like : `openvpn sfedu.ovpn`

3) add to /etc/openvpn
