#!/bin/bash

yum update
yum install -y git 
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
