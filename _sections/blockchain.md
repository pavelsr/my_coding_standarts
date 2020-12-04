---
---

# Блокчейн

##  Change blockhain location

Если вдруг вам по каким-то причинам нужно загрузить весь блокчейн эфира, но не хватает места на диске

```
#/bin/bash
OLD_PATH="/home/pavel/.ethereum/geth/chaindata"
NEW_PATH="/Volumes/Drive2/Ethereum/"
mkdir -p $NEW_PATH
cp -rpv $OLD_PATH $NEW_PATH
rm -rf $OLD_PATH
ln -s $NEW_PATH $OLD_PATH
```

or you can make an alias:

```
alias namecoin='namecoin -datadir=/media/nas/Namecoin'
```
