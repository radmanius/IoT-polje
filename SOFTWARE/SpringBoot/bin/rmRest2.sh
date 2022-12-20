#!/bin/bash

docker rm $(docker ps -a | grep rest-server2 | awk '{print $1}')

