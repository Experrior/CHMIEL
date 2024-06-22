#!/bin/bash

set -e

docker compose -f compose.yaml down

# Build images
if [[ $# -ge 1 ]] ; then
	docker compose -f compose.yaml build
fi

# Run compose
docker compose -f compose.yaml up -d --remove-orphans

set +e
watch -n 1 docker ps
