#!/bin/bash

export CHROME_BIN=/usr/bin/google-chrome
export DISPLAY=:99.0

#Install chrome stable version
sh -e /etc/init.d/xvfb start
sudo apt-get update
sudo apt-get install -y libappindicator1 fonts-liberation
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

sudo dpkg -i google-chrome*.deb

rm -f google-chrome-stable_current_amd64.deb
