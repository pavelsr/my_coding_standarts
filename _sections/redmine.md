---
---

# Redmine

## Running

Best way is to run with Docker and docker-compose using [official image](https://hub.docker.com/_/redmine/)


```
docker-compose up
```

But for now [issue](https://github.com/docker-library/redmine/issues/59) with official image still haven't resolved, so I used [bitnami image](https://hub.docker.com/r/bitnami/redmine/).


docker-compose.yml:

```
version: '2'
services:
  mariadb:
    image: 'bitnami/mariadb:latest'
    environment:
      - ALLOW_EMPTY_PASSWORD=yes
    volumes:
      - '${PWD}/mariadb_data:/bitnami/mariadb'
  redmine:
    image: 'bitnami/redmine:latest'
    ports:
      - '80:3000'
    volumes:
      - '${PWD}/redmine_data:/bitnami/redmine'
    depends_on:
      - mariadb
volumes:
  mariadb_data:
    driver: local
  redmine_data:
    driver: local
```


## Backup database

Below is the script which makes backup of redmine database into directory where it runs

```bash

# run it like ./backup-redmine.sh /home/redmine.fablab61.ru

parse_config_yml() {
	cd $1/config
	echo "Extracting database data from $1/config/database.yml"
	USER=$(grep -R "username:" database.yml | grep -o -E "\b(\w+)$")
	PASSWORD=$(grep -R "password:" database.yml | grep -o -E '"\b(\w+)"$' | sed -e 's/^"//'  -e 's/"$//')
	DB=$(grep -R "database:" database.yml | grep -o -E "\b(\w+)$")
	HOST=$(grep -R "host:" database.yml | grep -o -E "\b(\w+)$")
	echo "USER $USER PASS $PASSWORD DB $DB HOST $HOST"
}


PATH_TO_BACKUP=$(pwd)


if [ $# -eq 0 ]
  then
    echo "No arguments supplied. Plese provide abs path to redmine root directory"
  else
    parse_config_yml $1
    echo "Start making dump"
    mysqldump -u $USER -p$PASSWORD $DB > $PATH_TO_BACKUP/redmine-master_$(date +%Y%m%d_%H%M%S).data.sql
fi

```

Then download it from local server using scp (ssh key must be added):

```bash
scp root@fablab61.ru:/root/backups/redmine-master_20170403_231118.data.sql data.sql
```

It's better to download database backup once into redmine database shared docker volume (`mariadb_data` folder in our case)

Then connect to running container:

```bash
docker exec -t -i redmine_mariadb_1 /bin/bash
```

Then import database data:

```
mysql -u <username> -p<PlainPassword> <databasename> < <filename.sql>
```

E.g.

```bash
mysql bitnami_redmine < data.sql
```

Then copy all your redmine data (`conf`, `files`, `plugins`, `public/plugin_assets` and `public/themes` folders):

```bash
mkdir old_redmine_data
scp -r root@fablab61.ru:/home/redmine.fablab61.ru/plugins .
scp -r root@fablab61.ru:/home/redmine.fablab61.ru/files .
scp -r root@fablab61.ru:/home/redmine.fablab61.ru/public/plugin_assets public/plugin_assets
scp -r root@fablab61.ru:/home/redmine.fablab61.ru/public/themes public/themes
```

In our case there was two plugins: `redmine_contacts` and `redmine_helpdesk`


## Troubleshoting

```bash
tail -f /opt/bitnami/redmine/logs/production.log
```

## Possible errors

```
 [Client 1-4] Cannot checkout session because a spawning error occurred. The identifier of the error is 12747994. Please see earlier logs for details about the error
```


## Useful plugins
