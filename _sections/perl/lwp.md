---
---

## LWP::UserAgent

Примеры отправки POST запросов при помощи LWP::UserAgent

JSON, как тут https://htaccess.madewithlove.be/api/docs

```perl
my $req = HTTP::Request->new( 'POST', 'https://htaccess.madewithlove.be/api/docs' );
$req->header( 'Content-Type' => 'application/json' );
$req->content( encode_json $content[0] );
my $response = $lwp->request($req);    
print $response->decoded_content;
```

GET c параметрами и декодирование JSON (на примере API Яндекс.Расписаний)

```
use strict;
use warnings;
use LWP::UserAgent ();
use JSON;
use Data::Dumper::AutoEncode;

my $ua = LWP::UserAgent->new(timeout => 10);

my %params = (
  from => 'c39',
  to => 'c2',
  format => 'json',
  apikey => '366a6609-cf86-43a5-8e61-05c67c752ec4',
  lang => 'ru_RU',
  date => '2019-05-25'
);

my $url = URI->new("https://api.rasp.yandex.net/v3.0/search/");
$url->query_form(%params);
my $response = $ua->get($url); # HTTP::Response

if ($response->is_success) {
    my $h = decode_json( $response->decoded_content);
    warn eDumper $h;
}
else {
    die $response->content;
}
```
