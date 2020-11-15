---
---

## Perl


`#!/usr/bin/env perl`

[![awesome-perl](https://awesome.re/badge-flat2.svg)](https://github.com/hachiojipm/awesome-perl)

[![stackoverflow my favorites](https://img.shields.io/badge/stackoverflow-my%20favorites-orange?style=for-the-badge&logo=stackoverflow)](https://stackoverflow.com/search?q=infavorites%3A1441592+%5Bperl%5D)

[![stackoverflow perl tag top](https://img.shields.io/badge/stackoverflow-perl%20tag%20top-orange?style=for-the-badge&logo=stackoverflow)](https://stackoverflow.com/questions/tagged/perl?tab=Votes)

[![github.com/topics/perl](https://img.shields.io/badge/github-topic%3Aperl-black?style=for-the-badge&logo=github)](https://github.com/topics/perl)

[![telegram ru perl chat](https://img.shields.io/badge/Modern%3A%3APerl-%F0%9F%87%B7%F0%9F%87%BA-blue?style=for-the-badge&logo=telegram)](https://t.me/modernperl)

https://gh.metacpan.org/ - Люди Perl или проект "GitHub меееts CPAN"

### perldoc

perldoc - документация, созданная разработчиками языка.

Очень рекомендую полазить по двум следующим ссылкам

https://perldoc.perl.org/perlop.html

http://perldoc.perl.org/index-tutorials.html

http://perldoc.perl.org/index-faq.html

Помимо официального [браузера](https://perldoc.perl.org/) (сейчас в стадии beta) у perldoc есть неофициальный - https://perldoc.pl, в нём очень удобно переключаться между одной и той же документацией для разных версий perl, а также давать пермалинки на разделы

### Оформление кода (Code style)

Все перловые файлы должны быть отформатированы с помощью утилиты [perltidy](https://metacpan.org/pod/distribution/Perl-Tidy/bin/perltidy).

Все перловые файлы должны быть написаны в соответствии с рекомендациями "Perl Best Practices".

Самые основные гайдлайны записаны тут - https://perldoc.perl.org/perlstyle.html

Полный список pbp на русском [тут](https://docs.google.com/document/d/1ASXiq_c4-rDYd7_MrZR3X65CW7qqeq2kluJ5F3qABpI/edit?usp=sharing), [html версия тут](https://docs.google.com/document/d/e/2PACX-1vR3tdSGFKq86dvC5pcMEKGi0YTuyTPWVOc0NmGjsVRqiphE78ufN8V5yjVskjEjaxKawoNSpe_FQe6w/pub)

Автоматизированно проверить свой код на соответствие рекомендациям PBP можно при помощи [perlcritic](https://metacpan.org/pod/perlcritic)

### Хорошие обучающие ресурсы

Learn Perl in about 2 hours 30 minutes - http://qntm.org/files/perl/perl.html

http://modernperlbooks.com/

https://perl.plover.com/

https://www.youtube.com/user/gabor529/videos

### Хорошие ресурсы на русском

https://metacpan.org/pod/POD2::RU

https://ru.perlmaven.com/

https://ebookfoundation.github.io/free-programming-books/free-programming-books-ru.html#perl

https://ivan.bessarabov.ru/blog

### Новостные ресурсы

https://perlweekly.com/

### F.A.Q., chunks and snippets

#### Как запустить функцию, чъе имя хранится в переменной?

https://stackoverflow.com/questions/1915616/how-can-i-elegantly-call-a-perl-subroutine-whose-name-is-held-in-a-variable

#### smartmatch usage

```perl
no warnings 'experimental::smartmatch';
ok ( "11.06.2019" ~~ @x );
```

#### Тернарный оператор

Разберем один возможно неочевидный вывод при конкатенации и тернарном операторе

Пример:

```perl
my $str = '';
my $a = 'a';
$a ? $str.="b" : $str.= "c";
print $str;
```

Вопрос: Почему выводится `bc` а не `b` ?

Ответ: всё просто: [приоритет](https://perldoc.perl.org/perlop.html#Operator-Precedence-and-Associativity) оператора `.=` больше чем у `?:`. Получается: `($a ? $str.="b" : $str).= "c"`

Правильная запись тернарного оператора должна выглядеть так:

```perl
my $days_plus = ( $dow - $dt_min->day_of_week < 0 ) ? ( 7 - $dow ) : ( $dow - $dt_min->day_of_week ) ;
```

#### Часто используемые регулярки

For popular tasks please check [Regexp::Common](https://metacpan.org/pod/Regexp::Common) namespace firstly

Работа с копией - `/r`

```perl
use 5.14.0 ;
my $someString = "how do you do this";
say ($someString =~ s/how do/this is how/r) ;
```

Live replacement:

```perl
my $url =~ s/^\/board\/advertisement\/([0-9:]+)\//$1/;
```

Complex patterns:

```perl
my $pattern = '^\s*server_name\s*'.$hash->{server_name};
$hash->{str_from} = firstidx { $_ =~ qr/$pattern/ } @file;
```

Tested regexp for email:

```perl
if ($text_decoded =~ /(\w+@[\w.-]+|\{(?:\w+, *)+\w+\}@[\w.-]+)/) {
        warn $1;
}
```

Substring until first appearance:

```perl
my $string = "hello.world";
my $substring = substr($string, 0, index($string, "."));
```

[rindex()](https://perldoc.pl/functions/rindex) for reverse search

#### Посмотреть что в `@INC`

```shell
perl -le 'print for @INC'
perl -e "print qq(@INC)"
```

From perl script itself:

```perl
print $_."\n" foreach (@INC);
```

#### Распечатать все переменные окружения которые видит perl в алфавитном порядке

```perl
foreach (sort keys %ENV) {
  print "$_  =  $ENV{$_}\n";
}
```

#### Полезные переменные окружения

```
PERL5LIB
PERL5OPT=-d
PERLDB_OPTS='NonStop frame=1'
```

#### Использование стандартного дебаггера


#### Работа с кодировками

Если включена прагма use utf8, perl хранит внутри себя кодировки в Unicode

```perl
use utf8;
...
my $x = $res->decoded_content;
utf8::encode($x); # unicode -> utf8
my $decoded = decode_json $x;
```

Также можно юзать другие прагмы:

```perl
use encoding "cp1251";
binmode(STDOUT, ':encoding(cp1251):bytes');
use open 'IN' => ':encoding(cp1251)', 'OUT' => ':encoding(cp1251)'
```

Есть ещё классные модули [Deep::Encode](https://metacpan.org/pod/Deep::Encode) и [Data::Recursive::Encode](https://metacpan.org/pod/Data::Recursive::Encode)

#### Вывести список всех родительских классов

The `@ISA` array contains a list of that class's parent classes, if any  [источник](https://perldoc.pl/perlobj#A-Class-is-Simply-a-Package)

#### Как сдампить ВСЕ параметры функции вместе в именем функции ?

```
sub list {
	my ($calendar, $span) = @_;
	warn "".(caller(0))[3]."() : ".Dumper \@_; # return a list, $calendar - first element, $span second
```

#### Работа с массивами

##### Последний индекс (размерность) массива по его ссылке

```perl
my $a = [ 1, 2, 3 ];
warn $#$a;
```

##### Разница между splice и delete

delete оставляет undef на месте элемента, a splice удаляет со смещением

#### Работа с хешами

https://metacpan.org/pod/Sort::HashKeys

https://metacpan.org/pod/Hash::Ordered

https://metacpan.org/pod/Hash::Flatten - может быть полезно для мультиразмерных хешей

#### Сложные структуры данных

##### Фильтрация массива хешей

Оставить только определённые поля

```perl
for my $i (@$part_groups) {
    for my $k ( keys %$i ) {
        delete $i->{$k} if !grep { $k eq $_ } qw/node_id lev2 lev2_title/;
    }
}
```

```perl
for my $j (@$objects) {
    $j = { map { $_ => $j->{$_} } grep { exists $j->{$_} } @{$jsonconfig->{tickets}{fields_to_leave}} };
  }
```

#### Работа с именами файлов и путями

Рекомендую использовать модули Cwd и File::Spec

Примеры:

```perl
use Cwd 'abs_path';
use File::Spec;
warn abs_path('this.pl');
warn abs_path(__FILE__);
warn abs_path('a/this.pl'); # doesn't work
use Cwd;
warn getcwd();
warn File::Spec->catfile(getcwd(), 'html/regexp_test_1.html');  # get abs path
```

#### Чтение файла в строку

Хорошее решение - использование [File::Slurp](https://metacpan.org/pod/File::Slurp)

```perl
use File::Slurp qw(read_file);
my $text = read_file($url) ;
```

#### Передача параметров в модули

Вариант 1. Передача через конструктор объекта, ->new().

Вариант 2. Передача через параметры use, дальнейшая обработка через функцию import. Функция use обязательно вызывает import

```perl
use MyApp prm1 => 'x';
...

package MyApp;
use Data::Dumper;

sub import {
	print "This method will be executed anyway\n";
    my $pkg = shift;
    warn Dumper \@_;  # [ 'prm1', 'x' ];
}
```

Примеры: Log::Any::Adpater,

Внимание: если хотите сохранить структуру хеша, передавайте как hashref

Вариант 3. Через обязательный вызов какого-либо метода

use MyApp;
my $p = MyApp->new;
$p->configure

Вариант 4. Через переопределение глобальных переменных модуля. $Data::Dumper::Indent

#### Как назвать свой модуль?

https://pause.perl.org/pause/query?ACTION=pause_namingmodules

#### Как выбрать лучший модуль с cpan ?

Вначале посмотреть среди core modules: https://perldoc.perl.org/index-modules-A.html

Также можно воспользоваться моим сервисом, который дает возможность сортировать модули по рейтингу: https://github.com/pavelsr/cpanratings-cmp ( источник данных : https://cpanratings.perl.org/csv/all_ratings.csv )

#### Автоматическая генерация cpanfile

```
sudo cpm install -gv App::scan_prereqs_cpanfile
# then run scan-prereqs-cpanfile
scan-prereqs-cpanfile > cpanfile
sudo cpanm --installdeps .
```

#### Как запускать тесты?

В общем случае: `prove -lr`

с Переопределение функций в тестах

```perl
local *LWP::UserAgent::post = sub { ( undef, $url, %params ) = @_; return $resp };
```

Вариант переопределения через GOTO если данные внутри переопределения не нужны

```perl
my $z = \&LWP::UserAgent::get;
*Text::Tmpl2::render = sub {
   ...
   goto &$z;
};
```

#### Подсчет покрытия кода тестами

Using [Devel::Cover](https://metacpan.org/pod/Devel::Cover)

Example from Makefile:

```
docker-cover:
	docker exec zone cover -test -silent -nogcov -make 'prove -l $(file)' -report html
docker-cover-all:
	docker exec zone cover -test -silent -nogcov -report json
```

#### Как написать на Perl свою CLI утилиту?

Есть модули, которые упростят задачу

https://metacpan.org/pod/App::Cmd

https://metacpan.org/pod/App::CLI::Command

### Модули

Don't Reinvent Wheel — Не переизобретайте колесо

Не переизобретайте колесо — если подобное колесо уже существует, просто адаптируйте его для своих нужд. Вероятно, для решения данной проблемы уже существует стандартный модуль в дистрибутиве Perl, или модуль из CPAN, или модуль, разработанный другими людьми внутри организации.

#### Рейтинги

Список самых популярных модулей - https://metacpan.org/favorite/leaderboard

http://ali.as/top100/index.html - проект CPAN TOP 100 от [Adam Kennedy](https://github.com/adamkennedy).

Здесь есть четыре рейтинга

1) модули с наибольшим числом зависимостей (Heavy 100)

2) модули от которых зависят больше всех модулей (Valatile 100)

3) самые "падающие" при установке модули по данным с cpantesters.org (Fail 100)

4) (Meta 100)

http://neilb.org/reviews/index.html - обзоры на модули со сходным функционалом

TODO: предложить на обзор Neil Bowers или сделать обзор

`URI::Encode::uri_decode` vs `URI::Escape::uri_unescape`

`Mojo::DOM` vs `XML::LibXML`

[дебаггеры](https://github.com/pavelsr/coding_standarts/wiki/Perl-profilers-and-debuggers)

#### Публикация модулей

https://metacpan.org/release/Minilla

https://metacpan.org/pod/Dist::Zilla

### Объектно-ориентированное программирование

https://perldoc.perl.org/perlootut.html  [RUS](https://metacpan.org/pod/distribution/POD2-RU/lib/POD2/RU/perlootut.pod)

https://perldoc.perl.org/perlobj.html

### Логирование

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



#### Moose

http://modernperlbooks.com/books/modern_perl_2016/07-object-oriented-perl.html

https://metacpan.org/pod/distribution/Moose/lib/Moose/Cookbook.pod

https://metacpan.org/pod/distribution/Moose/lib/Moose/Manual/Attributes.pod

#### Moo

https://perlmaven.com/oop-with-moo

### DBI

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


### Mojolicious

### F.A.Q., chunks and snippets



### Yancy

### F.A.Q., chunks and snippets
