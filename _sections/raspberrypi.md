---
---
# Raspberry PI

## Питание

Рекомендуется использовать зарядку на 2.5А и AWG20 USB cable


## Запись образа на SD-карточку (в примере это том /dev/sdc)

```
dd bs=4M if=2017-04-10-raspbian-jessie.img of=/dev/sdX
```

C progress bar:
```
pv -tpreb | dd bs=4M if=2017-04-10-raspbian-jessie.img of=/dev/sdX
```


Через pipe

```
unzip -p 2017-01-11-raspbian-jessie.zip | pv -tpreb | sudo dd of=/dev/null bs=64M
```

dcfldd:

```
sudo dcfldd if=Armbian_5.25_Lamobo-r1_Ubuntu_xenial_default_3.4.113.img of=/dev/sdc bs=64M
```

GUI:

https://etcher.io/

## Что делать если образ не загружается правильно

Прежде чем пробовать другой образ

* Проверьте с другим USB кабелем (возможно не хватает питания)
* Проверьте другую SD-карту
* Убедитесь что запись происходит без ошибок (лучше всего писать ether'ом)

## Запуск Docker на RaspberryPi

Любой образ запустить не получится,только для архитектуры ARM.
Базовые образы можно найти на:

https://hub.docker.com/r/resin (единственный образ с работающей из коробки wiringpi)

https://hub.docker.com/r/armhf/ (old)

https://hub.docker.com/u/arm32v6/

https://github.com/alexellis/docker-arm

## Запуск docker-compose на Raspberry PI

```
sudo apt-get -y install python-pip
sudo pip install docker-compose
```


## Включить ssh из коробки

По умолчанию ssh на Raspberry Pi выключен

В разделе boot сделать `sudo touch ssh`

## Автоподключение к нужной wifi точке

sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

```
country=GB
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1


network={
    ssid="MYSSID"
    #psk="passphrase"
    psk=59e0d07fa4c7741797a4e394f38a5c321e3bed51d54ad5fcbd3f84bc7415d73d
}
```

## Управление пинами через shell

* [WiringPi](https://projects.drogon.net/raspberry-pi/wiringpi/)
* [pigpio](http://abyz.co.uk/rpi/pigpio/index.html)

## Как создать свой собственный дистрибутив на основе Raspbian.

Можно например через `qemu`. [Примерная пошаговая инструкция](https://github.com/FabLab61/devops/wiki/Modify-Raspbian-image)

## Автоматическое подключение к openvpn серверу

Чтобы vpn подключался автоматически нужно ovpn файл положить в /etc/openvpn

## Какие существуют одноплатные компьютеры на Linux

Raspberry Pi, Banana Pi,  Orange Pi, BeagleBone и т.д.

## Конфиг OpenWRT

```
config wifi-device 'radio0'
	option type 'mac80211'
	option channel '11'
	option hwmode '11g'
	option path 'platform/soc/3f300000.mmc/mmc_host/mmc1/mmc1:0001/mmc1:0001:1'
	option htmode 'HT20'

config wifi-iface 'default_radio0'
	option device 'radio0'
	option network 'lan'
	option mode 'ap'
	option ssid 'OpenWrt'
	option encryption 'none'
```
