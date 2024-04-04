#!/bin/bash

set -e

docker compose -f compose.yaml down

# Build images
if [[ $# -ge 1 ]] ; then

	docker build -f Dockerfile_front . -t chmiel_front
	docker build -f Dockerfile_db . -t chmiel_db
#	docker build -f Dockerfile_back . -t chmiel_back

fi


docker rm -f chmiel_back
docker rm -f chmiel_front
docker rm -f chmiel_db

# Build compose
docker compose -f compose.yaml build

# Run compose
docker compose -f compose.yaml up -d --remove-orphans

# Check if Docker Compose was successful
echo "Waiting for docker to start.."
sleep 5


docker compose -f compose.yaml logs > log_compose
docker compose -f compose.yaml logs
set +e
docker ps

