---
---

## ORM

### Общие рекомендации (best practices)

#### get_column

Если нужны данные только из одной конкретной колонки - используйте [get_column](https://metacpan.org/pod/DBIx::Class::ResultSet#get_column);

Пример:

```perl
my @curr_cities = map { $_->city_code } $resultset->search( {}, { select => 'city_code' } );
```

лучше заменить на

```perl
my @curr_cities = $resultset->get_column('city_code')->all;
```

#### populate

2. Если нужно добавить данные - обратите внимание на метод-обёртку [populate](https://metacpan.org/pod/DBIx::Class::ResultSet#populate), возможно запись будет более лакончиной

Пример:

```perl
for my $city_code (@to_insert) {
    $resultset->create( { city_code => $city_code } );
}
```

лучше заменить на

```perl
$resultset->populate([[qw(city_code)], map {[$_]} @to_insert);
```

##### -in при работе с массивами

Если вам нужно удалить массив записей по значениям - упростите запись за счёт модификатора `-in`

Пример:

```
for my $city_code (@to_delete) {
    $resultset->search( { city_code => $city_code } )->delete_all;
}
```

лучше заменить на

```
$resultset->search({city_code => {-in => \@to_delete}})->delete()
```



#### Конструирование запросов WHERE

Если будет OR - значение будет массив
Если будет AND - значние хеш

https://metacpan.org/pod/DBIx::Class::ResultSet

https://metacpan.org/pod/DBIx::Class::ResultSet#ATTRIBUTES

https://metacpan.org/pod/distribution/DBIx-Class/lib/DBIx/Class/Manual/Cookbook.pod#SEARCHING

https://metacpan.org/pod/SQL::Abstract#WHERE-CLAUSES

https://metacpan.org/pod/distribution/DBIx-Class/lib/DBIx/Class/Manual/Cookbook.pod#Using-SQL-functions-on-the-left-hand-side-of-a-comparison


WHERE ID >= x

```
->search_rs({ id => { '>=', $ARGV[0] }});
```

WHERE status = ? OR status = ? OR status = ?

```
status => { '=', ['assigned', 'in-progress', 'pending'] };
```

UPDATE

Если один аргумент

```
$order->extra_json($extra_json);
$order->update();
```

Если несколько

```
$order->update({ extra_json => $extra_json })
```

Для специальных функций

```
my %where = ( -and => [
  foo   => 1234,
  \["EXISTS ($sub_stmt)" => @sub_bind],
]);
```
