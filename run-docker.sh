#!/usr/bin/env bash
# Script to run this github pages using docker

# See also : https://github.com/envygeeks/jekyll-docker#readme

docker run --rm \
  --volume="$PWD:/srv/jekyll:Z" \
  --publish [::1]:4000:4000 \
  jekyll/jekyll \
  jekyll serve

# xdg-open http://localhost:4000/
