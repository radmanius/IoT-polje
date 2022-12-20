#!/bin/bash

docker stop $(docker ps -a | grep rest-server2 | awk '{print $1}')
