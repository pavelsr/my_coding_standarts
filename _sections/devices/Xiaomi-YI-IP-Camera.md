---
---

## Xiaomi IP camera

Страничка, посвященная работе с IP камерами Xiaomi Ants. На мой взляд лучшие IP камеры на рынке по соотношению цена-качество-дизайн.

[Тема про камеру на 4PDA](https://4pda.ru/forum/index.php?showtopic=638230)

### Подключение камеры к нужной WiFi сети

Кладём скрипт ``equip_test.sh`` с вписанными нужными SSID и passw в корневую папку:

```bash
#WiFi setter. Created by nfs911 for 4PDA
#!/bin/sh
#################################################
wifi_name="MakerHouse"
wifi_password="fab12shenzhen"
#################################################
sed -i 's/valid1=0/valid1=1/g' /etc/ui.conf
sed -i 's/doreset=1/doreset=0/g' /etc/ui.conf
#rm /etc/wpa_supplicant.conf
#rm /home/wpa_supplicant.conf
echo "ctrl_interface=/var/run/wpa_supplicant
ap_scan=1
network={
ssid=\""$wifi_name"\"
scan_ssid=1
proto=WPA RSN
key_mgmt=WPA-PSK
pairwise=CCMP TKIP
group=CCMP TKIP
psk=\""$wifi_password"\"
}" > /etc/wpa_supplicant.conf
cp /etc/wpa_supplicant.conf /home/wpa_supplicant.conf
sleep 5
#mv "/home/hd1/test/equip_test.sh" "/home/hd1/test/equip_test.sh.old"
rm "/home/hd1/test/equip
```

[Источник](https://4pda.ru/forum/index.php?act=findpost&pid=45047587&anchor=Spoil-45047587-2)

### RTSP

RTSP urls : rtsp://10.132.193.9/ch0.h264 (1280x738) or rtsp://10.132.193.9/ch1.h264 (low quality, 640x386)

### Запись:

#### VLC

```
vlc -vvv rtsp://10.132.193.9/ch1.h264 --sout="#transcode{vcodec=mp4v,vfilter=canvas{width=640,height=386}}:std{access=file,mux=mp4,dst=/data/123.mp4}"
```

#### ffmpeg

```
ffmpeg -i rtsp://10.132.193.9//ch0.h264 -vcodec copy -an -bsf:v h264_mp4toannexb fl.h264
```
