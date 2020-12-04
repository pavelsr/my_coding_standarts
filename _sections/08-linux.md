---
---

# Linux

Требования к разделу: приведенные решения должны работать в любой Linux системе, даже в [Busybox](https://ru.wikipedia.org/wiki/BusyBox)

## Добавление пользователей

```
sudo adduser [--home  DIR] user
```

## Добавить пользователя к группе (полезно в dialout, docker и т.д)

```
sudo usermod -aG docker $USER
```

## Авторизация без утомительного ввода пароля каждый раз

Два варианта:

1) ``ssh-copy-id id@server``

2) ``sshpass`` - требует сохранения пароля в явном виде где-нить в текстовом файлике


## Генерация ssh ключа

```
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## одновременно выполнить команду через ssh на нескольких машинах

```
sudo apt-get install clusterssh
```

## Поиск свободных портов на локальном хосте

```
netstat -ntulp | grep LISTEN
```

```
netstat -ntulp | grep LISTEN | grep 80
netstat -ntulp | grep LISTEN | grep VirtualBox
```


## Добавление своих команд

Глобальное решение - симлинк на нужный скрипт в `$PATH`.  Обычно добавляют в `/usr/local/bin` или в /usr/bin

Например

```
sudo ln -s /full/path/to/your/file /usr/local/bin/name_of_new_command
sudo ln -s /root/certbot-auto /usr/local/bin/certbot

```

Для конкретного юзера - редактировать `~/.bashrc`

Альтернатива - использование alias (обычно пишутся в `.bash_profile`)

```
ln -s $(which <existing_command>) /usr/bin/<my_command>
```


## Узнать куда подключился com порт

```
dmesg | grep tty
```

## Постоянное монтирование диска в /etc/fstab

1. Посмотреть UUID

```
sudo blkid
```

2. Создать точку монтирования

```
sudo mkdir /media/windows
```

3. Добавить в fstab

Образец

```
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
UUID=be35a709-c787-4198-a903-d5fdc80ab2f8  /media/nas  ntfs-3g  auto,users,uid=1000,gid=100,dmask=027,fmask=137,utf8  0  0
```

## Другие задачи монтирования и ошибки

### Примонтировать конкретный раздел до перезагрузки

```
sudo mount -t auto -v /dev/sdb2 /diskd
```

### Если NTFS система не размонтируется

Использовать `-l` и `-f` опции umount

### Сканирование на плохие блоки

```
sudo badblocks -vs /dev/sdb2 > badblocks.txt
```

## Изменение дефолтного имени хоста

```
sudo nano /etc/hostname
sudo nano /etc/hosts
```

## Узнать публичный IP из консоли

```
dig +short myip.opendns.com @resolver1.opendns.com

```

## Оцена места на диске

Топ 10 самых больших файлов

```
du -a / | sort -n -r | head -n 10
```

Либо можно вызвать GUI `sudo baobab`

## Как узнать где какой диск?

```
$ hwinfo --block --short
disk:                                                           
  /dev/sdb             KINGSTON SHSS37A
  /dev/sda             Samsung SSD 850
```

Альтернативы:

```
lsblk -o name,mountpoint,label,size,fstype,uuid | egrep -v "^loop"
sudo parted -l
```
