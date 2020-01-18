---
title: "Odroid and Docker"
tags: ["docker", "odroid", "single-board-computer"]
published: true
date: "2020-01-18"
dateComment: "New Year, New Blog post"
---

While looking to order a Single Board Computer (SBC) to use as a pfSense router I came across the [Odroid-HC2](https://www.hardkernel.com/shop/odroid-hc2-home-cloud-two/). It's a powerful, but somewhat dated, SBC that comes built-in to a drive bay sort of tray.

For now I am just playing with it, trying out [OpenMediaVault](https://openmediavault.org) and setting up [NextCloud](https://nextcloud.com). The latter is where I ran into difficulties. NextCloud, at least as I had it configured when I set it up in a compose file to take a look at it, uses MariaDB. The official Maria docker images include an image for Arm8, but not for Arm7, Arm64, or Armhf.

I found a few rather dated Dockerfiles, that weren't being pushed to DockerHub any longer. One that looked promising required cross-building, I believe necessarily on amd64. Not wanting to build it, push the build to DockerHub, then pull it back down, on a [friend's](https://github.com/nathan-osman/) suggestion, and the desire to learn something new, I decided to go with a local [Docker Registry](https://docs.docker.com/registry/). My notes as to how this is setup is as follows. (I also have it in git, because who wants to do this twice?)


# Files

## Registry Server (amd64) Side

`git clone git@github.com:riotkit-org/arm-mariadb.git`

### docker-compose.yaml

```yaml
version: "3"
services:
  registry:
    image: registry
    ports:
      - 5000:5000
    volumes:
      - registry_vol:/var/lib/registry
    restart: always

volumes:
  registry_vol:
```

### build-arm-maria.sh

```shell
#!/bin/env bash
cd arm-mariadb 
docker build . -f ./armhf.Dockerfile -t arm-maria:latest
docker image tag arm-maria 192.168.1.21:5000/arm-maria
docker push 192.168.1.21:5000/arm-maria
echo "Build complete."
```

The above assumes of course that the [arm-mariadb](https://github.com/riotkit-org/arm-mariadb) is cloned into this directory. (I made it a submodule of my private compose git repository)

Don't forget to `chmod +x` the shell script.

### Start the Registry and Run the Build

`docker up -d registry`

`./build-arm-maria.sh`

The server side is complete.

## Odroid Side

I didn't take the additional steps to secure my one container local registry. It's in my house, and I had more interesting things to do next. Please, if you follow these instructions, consider the risk involved if you publish container images to this server. Don't publish private code to an insecure server, and don't trust any images published to an insecure internet accessible server.

### /etc/docker/daemon.json

```json
{
  "insecure-registries" : ["192.168.1.21:5000"]
}
```

### Trying it out.

`docker pull 192.168.1.21:5000/arm-maria`

And like magic it works!

### Odroid-side docker-compose.yaml

```yaml
version: "2"
services:
  nextcloud:
    image: nextcloud
    ports:
     - 8080:80
    links:
     - nextcloud_db
    volumes:
      - nextcloud:/var/www/html
    restart: always
     
  nextcloud_db:
    image: 192.168.1.21:5000/arm-maria
    command: --transaction-isolation=READ-COMMITTED --binlog-format=ROW
    restart: always
    volumes:
     - nextcloud_db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=32gj8932garsedarsdards23g312
      - MYSQL_PASSWORD=huydsrwqade,i233289ra8232
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
    
volumes:
  nextcloud:
  nextcloud_db:
```

I hope someone finds this helpful. I didn't publish to DockerHub, but if there is a need I would be willing to if someone contacts me about it.
