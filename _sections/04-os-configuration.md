---
---

# Типичное конфигурирование ОС

Раздел для сисадминов

Особенности ОС, которые важно знать

Далее решения типичных задач конфигурирования

## Linux

### Определить что замедляет загрузку компьютера

```
dmesg
systemd-analyze [critical-chain|blame]
```

### Добавить привилегии гостевым пользователям:

1) Сеть, через GUI Network manager: https://askubuntu.com/questions/894750/allow-a-guest-session-wifi-access-with-no-users-logged-in

2) Съемные носители

New user: `useradd -G plugdev fablab`

`sudo usermod -a -G <groupName> userName`

`sudo usermod -a -G plugdev fablab`

`sudo usermod -a -G netdev fablab`

Либо создать пользователя `fablab-user` без пароля и добавить все эти привилегии ему

Полная инфа по привилегиям: https://wiki.ubuntu.com/Security/Privileges

### Как сделать виртуальную машину доступной для всех пользователей?

1. Добавляем нужных пользователей в группу vboxusers

```
sudo usermod -a -G vboxusers $USER
```

Посмотреть список групп пользователя можно командной `groups $USER`

2. Делаем папку виртуальной машины общей

3. Заходим в пользователя, оттуда запускаем команду Машина -> Добавить

P.S. Этот вариант расчитан на то, что виртуальную машину одновременно использует только один человек (вообще судя по всему VirtualBox и так сам её блокирует для запуска от других пользователей)

### Переключение раскладки в убунту 18.04

CTRL+WIN+SPACE

### Принтеры Samsung в Linux

При попытке установить suldr в ubuntu 18.04 d

```
W: Ошибка GPG: https://www.bchemnet.com/suldr debian InRelease: Следующие подписи не могут быть проверены, так как недоступен открытый ключ: NO_PUBKEY FB510D557CC3E840
E: Репозиторий «https://www.bchemnet.com/suldr debian InRelease» не подписан.
N: Обновление из этого репозитория нельзя выполнить безопасным способом, и поэтому по умолчанию он отключён.
N: Смотрите справочную страницу apt-secure(8) о создании репозитория и настройке пользователя.
```

и решение, предложенное на форуме (ниже)

```
sudo apt-get clean            # Remove cached packages
cd /var/lib/apt
sudo mv lists lists.old       # Backup mirror info
sudo mkdir -p lists/partial   # Recreate directory structure
sudo apt-get clean
sudo apt-get update           # Fetch mirror info
```

не помогает

Также не помогают

```
sudo apt-key adv --keyserver bchemnet.com --recv-keys FB510D557CC3E840
wget http://www.bchemnet.com/suldr/pool/debian/extra/su/suldr-keyring_1_all.deb
[trusted=yes]
```

https://mirror.yandex.ru/mirrors/deepin/packages/pool/non-free/s/suldr-keyring/ - зеркало яндекса

```
sudo wget -O key.deb https://mirror.yandex.ru/mirrors/deepin/packages/pool/non-free/s/suldr-keyring/suldr-keyring_2_all.deb
sudo dpkg -i key.deb
```
