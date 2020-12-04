---
---

# Raspbian


Пошаговая инструкция как сделать свой кастомный образ для Raspberry PI из дистрибутива Raspbian

Let's learn how to modify Raspbian image.

We will make 5 things

1. Mount/unmount image filesystem
2. Install additional packets
3. Enable ssh by default
4. Setup WiFi passwords
5. Change default password


## 1. Mount/unmount image filesystem

Fistly you need to know what is the start block of target filesystem and what is the block size.

So offset will be = `<block_size>*<start_lba>`

```
pavel@pavel-desktop-x79:/media/pavel/X79-NAS/torrent$ fdisk -l rpi_fablab.img
Диск rpi_fablab.img: 1,7 GiB, 1854590976 байтов, 3622248 секторов
Единицы измерения: секторов из 1 * 512 = 512 байтов
Размер сектора (логический/физический): 512 байт / 512 байт
I/O size (minimum/optimal): 512 bytes / 512 bytes
Тип метки диска: dos
Идентификатор диска: 0x11eccc69

Устр-во         Загрузочный Start Конец Секторы  Size Id Тип
rpi_fablab.img1              8192   93813   85622 41,8M  c W95 FAT32 (LBA)
rpi_fablab.img2             94208 3622247 3528040  1,7G 83 Linux
```

In our example offset is `48234496`

So we can mount filesystem following way

```
sudo mkdir -p /mnt/rpi_fablab
sudo mount -o loop,offset=48234496 rpi_fablab.img /mnt/rpi_fablab
```

## 2. Install additional packets




[More info](https://wiki.debian.org/RaspberryPi/qemu-user-static)

Most used packets which are not included in distro:

* nmap
* ipcalc
* aptitude
* omxplayer (for gui only)
* openvpn
* App::cpanminus
* python-pip
* wiringpi
* sshpass
* docker
* docker-compose
* build-essential

## 3. Enable SSH by default

SSH was disabled by default in Raspbian versions released after November 2016

If you want to enable SSH, all you need to do is to put a file called ssh in the `/boot/` directory (`sudo touch ssh`). The contents of the file don’t matter: it can contain any text you like, or even nothing at all. When the Pi boots, it looks for this file; if it finds it, it enables SSH and then deletes the file. [Source](https://www.raspberrypi.org/blog/a-security-update-for-raspbian-pixel/)



## 4. Setup WiFi passwords

You can put all known SSIDs and its passwords on `/mnt/rpi_fablab/etc/wpa_supplicant/wpa_supplicant.conf` file.

```
country=RU
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="MakerHouse"
    psk="fab12shenzhen"
}

network={
    ssid="MYFABLAB"
    psk="fab17chile"
}
```

## 5. Change default password

Fastest way is to execute `passwd` on step 2.

[More info](https://www.raspberrypi.org/documentation/linux/usage/users.md)


## Other ways of customization

Also you can build fully customized image using pi-gen script https://github.com/RPi-Distro/pi-gen

And you can even build OS image using app of my friend Denis https://cusdeb.com/
