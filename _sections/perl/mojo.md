---
---

## Mojolicious

### F.A.Q., chunks and snippets

#### Парсинг скачанного файла с помощью `Mojo::DOM`

Simulate http requests

```perl
use File::Slurp qw(read_file);
my $text = read_file($url) ;
my $dom = Mojo::DOM->new($text);

# Mojo::Message::Response -> Mojo::DOM

my $dom = $c->ua->get('https://rosreestr.net/kadastr/'.$egrn)->res->dom;
```


CORS

```
$c->res->headers->access_control_allow_origin('*');
```

Тест Mojolicius::Lite

```perl
# How to test Mojo::Lite apps
# https://groups.google.com/d/msg/mojolicious/-AL3SpkAwu8/gN0feyzS0_8J

use FindBin;
$ENV{MOJO_HOME} = "$FindBin::Bin/../";
require "$ENV{MOJO_HOME}/backruptcy_api.pl";

```


Сериализация и обработка параметров

```perl
my $param_names = $self->req->params->names

```

```perl
for ( allowed_object_query_properties() ) {
    $query->{$_} = $c->param($_) if ( defined $c->param($_) );
}
```


```perl
my $query = $c->req->params->to_hash
```
