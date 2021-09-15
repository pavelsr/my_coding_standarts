# Как скомпилировать страницу локально

Инструкция приведена для ОС Ubuntu / Linux Mint. Для других систем должно быть аналогично

Обращайтесь к документации Jekyll при возникновении проблем

0) Клонируем проект

```
git clone git@github.com:pavelsr/my_coding_standarts.git
```

1) Устанавливаем jekyll

```
sudo apt-get install ruby ruby-dev build-essential zlib1g-dev
# zlib1g-dev требуется для установки гема nokogiri
sudo gem update --system
sudo gem install bundler jekyll
sudo bundle install (установить всё из Gemfile)
```

2) Запускаем сайт

```
bundle exec jekyll serve
```

Скомпилированная версия проекта будет доступна локально на http://127.0.0.1:4000/

# Хочу добавить в проект какую-нить Ruby-библиотеку

Обратите внимание, что Github запускает Jekyll в «безопасном режиме», и на пользовательские плагины генератор не обратит внимания

Доступные плагины: https://pages.github.com/versions/

# Некорректный перевод Markdown в html

markdown в html переводится с помощью [фильтра markdownify](https://jekyllrb.com/docs/liquid/filters/#markdownify) шаблонизатора [Liquid](https://github.com/Shopify/liquid/). Ruby-код фильтра [тут](https://github.com/jekyll/jekyll/blob/4fbbefeb7eecff17d877f14ee15cbf8b87a52a6e/lib/jekyll/filters.rb#L16). В конечном счете всё [сводится](https://jekyllrb.com/docs/configuration/markdown/) к конвертации через [kramdown](https://github.com/gettalong/kramdown) с опциями.

По умолчанию используется kramdown-parser-gfm. Для Github Pages также можно переключить на чистый kramdown. Всё остальное требует установки отдельных гемов и для github pages не подходит.

все параметры, которые поддерживает kramdown-parser-gfm перечислены [тут](https://github.com/kramdown/parser-gfm#options), [define в коде](https://github.com/kramdown/parser-gfm/blob/f1012bebbe97358ed8a1f5d16e750d3567a0d1a4/lib/kramdown/parser/gfm/options.rb)

Список параметров Kramdown - тут.

Опций, позволяющих подсвечивать ссылки сразу в обоих вариантах (kramdown и kramdown-parser-gfm) отсутствую, для Github Pages нужно писать на js что-то типа `confluence.postpaste-fix`. Остановился пока на linkify.js

Если что-то сломалось - задайте вопрос зазрабочикам Liquid. Проект поддерживает канадская компания Shopify, которая занимается разработкой конструкторов интернет-магазинов. Так что шансы на быструю обратную связь есть.

Теоретически вы также можете [написать собственный markdown парсер](https://jekyllrb.com/docs/configuration/markdown/#custom-markdown-processors)

# Сортировка разделов

По умолчанию Jekyll сортирует все разделы из папки `_sections` по алфавиту. Если хотите чтоб статья отображалась выше остальных - переименуйте файл с разделом, поставив перед ним префикс, например `01-intro.md`.

Папка `_sections` - стандартная [коллекция](https://jekyllrb.com/docs/collections/) Jekyll. Вывод коллекции включается в `_config.yml`

Чтобы раздел корректно подгрузился файл должен обязательно начинаться со специального YAML блока [front-matter](https://jekyllrb.com/docs/front-matter/)

```
---
---
```

даже если страничке не требуется никаких мета-данных (обычно в front-matter блок `---` помещаются стандартные аттрибуты layout, title и др. )

# Как запустить эту страничку вне Github ?
