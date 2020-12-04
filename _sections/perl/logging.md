---
---

## Логирование

1) Для логгирования рекомендуется использовать синглтон [Log::Any](https://metacpan.org/pod/Log::Any) и [Log::Any::Adapter::Fille](https://metacpan.org/pod/Log::Any::Adapter::Fille)

(последний особенно удобен если одновременно в лог могут писать несколько cron скриптов - по PID можно легко понять какой именно пишет)

2) `Log::Any::Adapter` может быть только один

3) Чтобы в логе показывались `print`, `warn` и `die` из модулей нужно STDOUT и STDERR перенаправлять в тот же файл что и задан в `Log::Any::Adapter::Fille`. `Log::Any::Adapter::Fil(l)e` их автоматически не перехватывают!

В случае локальных игр с докером (не на продакшене) можно делать так

```
# perl
* * * * * cd /app && perl -Ilib crawler.pl >>/proc/1/fd/1 2>&1
#
use Log::Any::Adapter ( 'Fille', file => '/proc/1/fd/1', log_level => 'debug' );
```


P.S. `use Log::Any::For::Std;` чет не работает.

```
# не перехватывает warn и die
# use Log::Any::Adapter;
# use Log::Any::For::Std;
# Log::Any::Adapter->set('Fille', file => '/app/some.log', log_level => 'debug');
```
