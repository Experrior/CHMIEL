#!/bin/bash

set -e

docker compose -f compose.yaml down

# Build images
if [[ $# -ge 1 ]] ; then
	docker build -f Dockerfile_db . -t chmiel_db
	docker build -f Dockerfile_back . -t chmiel_back
	docker build -f Dockerfile_front . -t chmiel_front
	docker build -f Dockerfile_py . -t chmiel_py
	docker build -f Dockerfile_locust . -t chmiel_stress_test
fi

# Run compose
docker compose -f compose.yaml up -d --remove-orphans

set +e
watch -n 1 docker compose ps
