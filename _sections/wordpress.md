---
---

# Wordpress

## Переезд на другой домен

```
wp option update home 'http://newdomain.tech'
wp option update siteurl 'http://newdomain.tech'.
```

Если в вашем блоге включем режим Multisite, то нужно изменить в БД Wordpress
в таблицах wp_site и wp_blogs соответствующие ссылки на сайт.
