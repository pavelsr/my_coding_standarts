---
---

# Mysql

[![stackoverflow my favorites](https://img.shields.io/badge/stackoverflow-my%20favorites-orange?style=for-the-badge&logo=stackoverflow)](https://stackoverflow.com/search?q=infavorites%3A1441592+%5Bmysql%5D)

## Рекомендации по проектированию БД

Cоветы по проектированию таблиц и нормализации:

http://hitechnotes.blogspot.com/2014/05/blog-post.html?q=mysql

http://b62.tripod.com/doc/dbbase.htm

Помнить что есть три уровня нормализации!

Не рекомендуется обзывать колонки также как и ключевые слова

https://dev.mysql.com/doc/refman/8.0/en/keywords.html

AUTO_INCREMENT поле в таблице может быть всего одно и оно обязательно должно быть PRIMARY_KEY

there can be only one auto column and it must be defined as a key

Поэтому создать такую таблицу не получится:

```mysql
CREATE TABLE checks (
  id INT NOT NULL AUTO_INCREMENT                    COMMENT 'ID проверки',
  epoch int(11) NOT NULL PRIMARY KEY                COMMENT 'current unix epoch timestamp',
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci, COMMENT='Все cron проверки';
```

## Различия MariaDB и MySQL

Because MariaDB uses the C escape syntax in strings (for example, "\n" to represent the newline character), you must double any "\" that you use in your REGEXP strings.

Two backslash characters,
(one for the MariaDB parser, one for the regex library), are required to properly escape a character


## Настройка

Посмотреть compiled defaults:

```
mysqld --verbose --help
```

Список всех переменных смотреть тут же или в https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html

### Получить лог баз

с рестартом

```
[mysqld]
general_log = on
general_log_file=/usr/log/general.log
```

без рестарта

```
SET global log_output = 'FILE';
SET global general_log_file='/Applications/MAMP/logs/mysql_general.log';
SET global general_log = 1;
```

### Как убрать Warning: Using a password on the command line interface can be insecure ?

Вариант 1:

```
export MYSQL_PWD=${PASSWORD}; mysql
```

Вариант 2:

```
mysql_config_editor
```

### Триггеры

Если вас не устраивает polling и вам нужны хуки - триггеры отличный способ

Так например если вам нужно выполнить внешний скрипты при обновлении какой-либо таблицы - смотрите на
https://github.com/mysqludf/lib_mysqludf_sys

Весь список udf

https://github.com/mysqludf

Минус триггеров - не удовлетворяют критериям транзакционности ACID

## Частые запросы

### Кластеризация значений таблички

```mysql
select sum(case when table_comment <> '' then 1 else 0 end) / count(*)
from INFORMATION_SCHEMA.TABLES
```

### Показать все foreign keys выбранной базы данных

```mysql
select
    concat(table_name, '.', column_name) as 'foreign key',  
    concat(referenced_table_name, '.', referenced_column_name) as 'references'
from
    information_schema.key_column_usage
where
    referenced_table_name is not null;
```

### Показать все таблички, в которых есть определённое поле.

```mysql
SELECT DISTINCT TABLE_NAME
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE COLUMN_NAME IN ('lev2','ColumnB')
        AND TABLE_SCHEMA='220_volt';
```

### Показать все таблички в которых колонка определенного типа

Например, искомый тип - `INT(10) UNSIGNED`

```
SELECT table_schema, table_name, column_name, column_comment
FROM information_schema.columns
WHERE column_type = 'INT(10) UNSIGNED' AND column_name = 'id' AND COLUMN_KEY = 'PRI';
```

Очень полезно при реверс-инжиниринге базы, когда разработчики базы забыли прописать FOREIGN KEY.
Например в какой-нить табличке есть поле external_id, но для него не прописан foreign key, хотя фактически он есть.


### Показать взаимосвязанные виртуальные таблички (VIEWS)

Если искомый VIEW - catalog_product, то

```
SHOW CREATE TABLE catalog_product;
SHOW CREATE VIEW catalog_product
```

### Показать комментарии без использования information_schema

```
SHOW FULL COLUMNS FROM <tablename>
```

### Метрики качества sql базы

Все комментарии к таблицам - `SELECT table_comment FROM INFORMATION_SCHEMA.TABLES;`
Все непустые комментарии к таблицам - `SELECT table_comment FROM INFORMATION_SCHEMA.TABLES WHERE table_comment <> '';`
Процент откомментированных таблиц - TODO


### Примеры интересных запросов в LEFT JOIN и RIGHT JOIN

```
SELECT DISTINCT
	TR.id,
	R.title,
    COUNT(N.node_id) PartsCount
FROM Ru_T3_Parts AS parts
	INNER JOIN Ru_T3_C AS C ON (parts.code=C.code)
	INNER JOIN Ru_T3_A AS A ON (A.r_id=C.r_id AND A.set_b1<=1)
	INNER JOIN Ru_T3_Ref1 AS TR ON (A.r_id=TR.r_id)
	INNER JOIN Ru_Ref1 AS R ON (TR.id=R.id)
	INNER JOIN Ru_Node AS N ON (N.node_id=A.node_id)
	LEFT JOIN Ru_T3_Status AS S_major ON (C.code=S_major.code AND S_major.region='61')
	LEFT JOIN Ru_T3_Status AS S_extra ON (C.code=S_extra.code AND S_extra.region='0')
WHERE
	N.lev2 = '654'
	AND (S_major.status > 0 OR S_extra.status > 0)
HAVING PartsCount > 0
ORDER BY
	R.title
```

### Подсчёт статистики через GROUP BY

```mysql
SELECT node_length_a1, count(*) C GROUP BY node_length_a1 ORDER BY C ASC;
```

### HAVING vs WHERE

HAVING используется с аггрегатными операциями

WHERE before GROUP BY and HAVING after GROUP BY

### Что делать если MySQLWorkbench показавает поле как blob ?

https://stackoverflow.com/questions/13634369/mysql-workbench-shows-results-as-blob
