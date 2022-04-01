#!/usr/bin/env bash
# Script to install all dependencies to run github pages server locally

sudo apt-get install ruby ruby-dev build-essential zlib1g-dev
sudo gem update --system
sudo gem install bundler jekyll
sudo bundle install
