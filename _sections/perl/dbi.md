---
---

## DBI

Извлечение списка схем:

```
$dbh->tables('', '%', '');
```

Список таблиц в текущей схеме

```
@t = $dbh->tables(); # с префиксом
```

Если нужно значения только одной колонки

```
$dbh->selectcol_arrayref('SELECT node_id FROM Ru_Node ORDER BY node_id');
```



```perl
@result = @{ $dbh->selectall_arrayref($sql, { Slice => {} }) };
```

Использование SQL::Abstract с DBI

```perl
my $table = 'cities';
my $sql = SQL::Abstract->new;
my $query = { code => 'LED' };

my ($stmt, @bind) = $sql->select($table, [ qw/code name country_code/ ], $query);
my $sth = $dbh->prepare($stmt);
$sth->execute(@bind);
warn Dumper $sth->fetchall_arrayref( {} ); # as AoH, with hash Slice

$sth->execute(@bind);
warn Dumper $sth->fetchall_hashref('code'); # as HoH
```

При помощи https://metacpan.org/pod/DBI#Catalog-Methods пока нельзя получить инфо о количестве записей, только так:

```
my $count = $conn->selectrow_array("SELECT COUNT(*) FROM $table");
```

``` perl
$sth = $dbh->table_info( $catalog, $schema, $table, $type );
# $catalog - нужно оставить пустой строкой
# $schema - если пустая то текущая база, если нет то будут включены еще и другие бд, например information_schema
```

### Вставка хеша на чистом DBI

```perl
sub _insert_hash {
    my ( $self, $table, $field_values ) = @_;
    # return if !defined $field_values;
    return if (!%$field_values);
    my @fields = sort keys %$field_values;
    my @values = @{$field_values}{@fields};
    my $sql    = sprintf "insert into %s (%s) values (%s)", $table, join( ",", @fields ), join( ",", ("?") x @fields );
    # my $sth = $dbh->prepare_cached($sql);
    my $sth = $self->{dbh}->prepare($sql);
    return $sth->execute(@values);
}
```
```
