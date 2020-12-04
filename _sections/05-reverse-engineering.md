---
---

# Реверс-инжиниринг

Данный документ ставит задачу помочь быстро разобраться в чужом коде и предоставить инструменты для автоматизированного документирования

Особенно полезно если в репозитории может лежать неработающий код.

## Изучение репозитория

Показать summary какие расширения файлов есть в папке

```bash
find . -type f | perl -ne 'print $1 if m/\.([^.\/]+)$/' | sort -u
````

TO-DO: показывать рядом с расширениями статистику файлов

https://stackoverflow.com/questions/1842254/how-can-i-find-all-of-the-distinct-file-extensions-in-a-folder-hierarchy

## API

Очень удобный инструмент для документирования API - Swagger

Вначале можно инспектить API через [Swagger Inspector](https://inspector.swagger.io/builder), а уже оттуда добавлять в [SwaggerHub](https://app.swaggerhub.com)

## Диаграмма вызовов Perl модуля

Вариант 1 - статический анализ.

Написал отличный [хелпер](https://gist.github.com/pavelsr/99caccfb9a9cb3a981c2c8a611f3e22e) для [perl_call_graph](https://github.com/cobber/perl_call_graph)

Установка:

```bash
sudo curl -L https://bit.ly/perlcghelper -o /usr/local/bin/pcg && sudo chmod +x /usr/local/bin/pcg
```

Вариант 2 - динамический анализ

Простой вариант - запустить стандартный дебаггер

Сложный вариант (требует запуска скрипта) - вызвать скрипт с опцией `-d:NYTProf`, затем hytprofhtml и посмотреть packages-callgraph.dot. Бонус этого варианта что покажет ещё и время выполнения каждой функции
