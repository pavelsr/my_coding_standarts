---
---

# curl

curl - крайне полезный инструмент для отладки HTTP-запросов

## Content-type

Ниже даны примеры запросов для различных Content-type

### application/json

```
curl -s -X PUT -H "Content-Type: application/json" -d '{"action":"test"}' https://api_user:api_pass@host:port/api/v2/some_method
```

### application/x-www-form-urlencoded

Заголовок Content-Type в этом случае устанавливать не нужно

```
curl -s -X POST -d 'globalCity=7700000000000' http://www.220v.test/city/change/
```

## Показать только заголовки

```
curl -sD - -o /dev/null
```

## Отключить кеш

```
curl -H "Cache-Control: no-cache"
```
