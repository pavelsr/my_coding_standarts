---
---

# Bash

Some helpful scripts

Task 1. Delete all before binlog

```
/mysql/mysql_dbh/binlog/dbh.000371
/mysql/mysql_dbh/binlog/dbh.000372
/mysql/mysql_dbh/binlog/dbh.000373
```

```
sed 's/^.*binlog/binlog/' /diskd/litdb/mysql_dbh/binlog/dbh.index
```

## Изменить оболочку

```
chsh
```

## Портабельность

Для портабельности рекомендую озаглавливать ваши скрипты как

Например из-за [этого](https://stackoverflow.com/questions/6047648/bash-4-associative-arrays-error-declare-a-invalid-option/43948526#43948526)

```
#!/usr/bin/env bash
```

cat without comments

```
cat httpd.conf | egrep -v "^\s*(#|$)"
```

Напечатать при помощи cat

```
cat <<EOF > print.sh
#!/bin/bash
echo \$PWD
echo $PWD
EOF
```

## Вывести рекурсивно список файлов с содержимым

```
find -L -type f -name "*.json" | xargs tail -n +1
```

Хороший, но недостаточно, вывод:

```
tree
find -L -type f . -exec cat {} +
find -L -type f | xargs cat
find . -type f -printf "%p\n"
```
