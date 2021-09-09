---
---

# Docker

Лучшие docker-практики

## Как держать разные настройки для теста и прода?

Я держу в проекте три файла:

```
docker-compose.yml - общая конфигурация
docker-compose.override.yml	- только локальные настройки
docker-compose.prod.yml	- настройки продакшна
```

Локально всё будет запускаться стандартным `docker-compose up`

А на проде указываем файлы явно:

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Как резолвить хосты через docker?

Мало кто знает, но у docker [есть](https://stackoverflow.com/questions/35744650/docker-network-nginx-resolver) встроенный DNS сервер 127.0.0.11
