---
---

# Cron

Be aware with 4 things in cron:

1) $ENV variables

Make your own `docker-entrypoint.sh` to transfer them from user ENV

2) Home dir (don't forget to make `cd` in crontab)

3) In production environment you should use `cron -f` without any `tail -f`

4) cronjob file must end with newline

## Cron в Docker

Нюансы (что надо помнить чтоб сберечь много времени)

1) Пакет cron во всех debian-based дистрибутивах скомпилирован так что может выводить свой собственный лог ТОЛЬКО в syslog. [пруф](https://superuser.com/questions/1283732/cron-logging-output-without-syslog-facility). Соответственно если речь о сборки Docker-образа то нужно обязательно включать и запускать `rsyslog`

Чистый лог cron (без вставок с `syslog`) можно получить только [подтюнив](https://serverfault.com/questions/562982/how-to-prevent-cron-logs-from-registering-in-syslog) настройки syslog - `/etc/rsyslog.conf` / `/etc/rsyslog.d/50-default.conf`

`imklog` также можно отключить за ненадобностью и генерацией лишних ошибок.

2) Запускать cron нужно с помощью `systemd`. Если вместо `service cron start` запустить как `cron -f -L 15` то работать почему-то не будет :(

Т.е. единственно правильный `CMD` будет типа такого

```
command:
        - /bin/bash
        - -c
        - |
            cat cronjob | crontab - && service rsyslog start && service cron start && tail -f /var/log/syslog
```

Лог-признак того что cron стартанул правильно:

```
cron_demo_4 | Jul  1 09:21:55 3673956d987a cron[33]: (CRON) INFO (pidfile fd = 3)
cron_demo_4 | Jul  1 09:21:55 3673956d987a cron[35]: (CRON) STARTUP (fork ok)
```


https://github.com/moby/moby/issues/19616

docker stop command attempts to stop a running container first by sending a SIGTERM signal to the root process (PID 1) in the container. If the process hasn't exited within the timeout period a SIGKILL signal will be sent.

## cron vs crond

```
SYNOPSIS
       cron [-f] [-l] [-L loglevel]

DESCRIPTION
       cron is started automatically from /etc/init.d on entering multi-user runlevels.

OPTIONS
       -f      Stay in foreground mode, don't daemonize.

       -l      Enable  LSB compliant names for /etc/cron.d files. This setting, however, does not affect the parsing of files under
               /etc/cron.hourly, /etc/cron.daily, /etc/cron.weekly or /etc/cron.monthly.

       -n      Include the FQDN in the subject when sending mails. By default, cron will abbreviate the hostname.

       -L loglevel
               Tell cron what to log about jobs (errors are logged regardless of this value) as the sum of the following values:

                   1      will log the start of all cron jobs

                   2      will log the end of all cron jobs

                   4      will log all failed jobs (exit status != 0)

                   8      will log the process number of all cron jobs

               The default is to log the start of all jobs (1). Logging will be disabled if levels is set to zero (0). A  value  of
               fifteen (15) will select all options.
```

```
/ # crond --help
BusyBox v1.26.2 (2017-11-23 08:40:54 GMT) multi-call binary.

Usage: crond -fbS -l N -d N -L LOGFILE -c DIR

    -f      Foreground
    -b      Background (default)
    -S      Log to syslog (default)
    -l N    Set log level. Most verbose:0, default:8
    -d N    Set log level, log to stderr
    -L FILE Log to FILE
    -c DIR  Cron dir. Default:/var/spool/cron/crontabs
```

Alpine linux не требует указать юзера в crontab, а Ubuntu требует

```
echo '* * * * * perl /root/www/insert.pl 2>&1' > /etc/crontabs/root
```


```
ln -sf /proc/1/fd/1 /var/log/syslog
```
