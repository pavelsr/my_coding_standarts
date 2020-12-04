---
---

# Планировщики

Данный раздел посвящен выполнению задач по расписанию

* cron
* anacron
* at
* Apache Airflow
* https://github.com/rundeck/rundeck
* https://github.com/Nextdoor/ndscheduler

## at

ubuntu

```
# at -f test.sh now + 1 minute
Can't open /var/run/atd.pid to signal atd. No atd running?
```

alpine

Добавлять задания `at` можно только на том контейнере(ос) где запущен `atd` !

```
# at -m -f v.pl now + 1 minute
warning: commands will be executed using /bin/sh
Cannot open lockfile /var/spool/atd/.SEQ: No such file or directory
```
