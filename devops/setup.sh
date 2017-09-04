#!/bin/bash

yum update
yum install -y git nginx postgresql
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.3/install.sh | bash
npm install -g sequelize-cli nodemon
