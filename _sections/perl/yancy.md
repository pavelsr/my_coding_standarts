---
---

## Yancy

### Quickstart & F.A.Q.

1. Создаём Mojo приложение

```
mojo generate lite_app app.pl
```

2. Запускаем БД

Можно из docker-контейнера

3. Добавляем в app.pl нужный бэкенд

```perl
use Mojo::mysql;

# и прописываем его в конфиге
plugin Yancy => {
    backend => { Mysql => Mojo::mysql->new( 'mysql://crm:r0v@127.0.0.1/yancy' ) },
    read_schema => 1,
};

```

4. Заапускаем mojo приложение, например через `morbo app.pl`

Появляется роут  http://127.0.0.1:3000/yancy где поднимается простейший интерфейс администрирования БД

На роуте http://127.0.0.1:3000/yancy/api появится сгенерированная схема API, которую можно использовать в Swagger

```javascript
const ui = SwaggerUIBundle({
        urls: [
          {name: "Yancy API",                  url: "/yancy/api"},
        ],
```

### FAQ

### Какая самая полезная опция Yancy ?

x-list-columns

может быть как обычным массивом, так и массивом хешей со свойствами title и template

#### Как задать свой шаблон отображения для контроллера yancy#list

https://metacpan.org/dist/Yancy/view/lib/Yancy/Guides/Schema.pod#Configuring-the-List-View


#### Как вместо названия таблицы отображать что-то более человекопонятное в админке?

Прописать в конфиге параметр `schema.<table_name>.title`

Пример:

```yaml
schema:
  flights:
  cities_iata:
    title: IATA коды городов
```

#### Как исключить из выборки определенные колонки?

Задать x-list-columns в `schema.<table_name>`

Пример:

```perl
plugin Yancy => {
    ...
    schema => {
        companies => {
            'x-list-columns' => [ 'name', 'jobs_count', 'hh_id' ]            
        },
    },
};
```

(при описании схемы в json/yaml то же самое)

#### Как отображать все поля базы в админке?

[Cейчас отображаются](https://github.com/preaction/Yancy/issues/46) по умолчанию только поля `'id', 'name', 'username', 'title', or 'slug'.`

Задать что ещё отображать в админке и в каком формате можно при помощи `x-list-columns`

Примеры:

```yaml
schema:
  flights:
    x-list-columns:
    - flight_date
    - flight_num
```

```yaml
cities_iata:
    title: IATA коды городов
    example:
      name: Санкт-Петербург
      iata: LED
    x-list-columns:
      - title: Город
        template: '{name} ({iata})'
```
