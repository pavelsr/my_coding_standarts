---
---

# VirtualBox

Чтоб использовать установленную Windows через VirtualBox с Linux хоста нужно сделать rawdisk :


```
VBoxManage internalcommands createrawvmdk -filename /home/$USER/sdb.vmdk -rawdisk /dev/sda2
```

Подробности: http://hitechnotes.blogspot.com/2012/07/blog-post.html?q=virtualbox
