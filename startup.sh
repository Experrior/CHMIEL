#!/bin/bash



# Build images
docker build -f Dockerfile_front . -t chmiel_front

docker build -f Dockerfile_back . -t chmiel_back


# Build compose
docker compose -f compose.yaml build

# Run compose
docker compose -f compose.yaml up -d


# Check if Docker Compose was successful
if [ $? -ne 0 ]; then
    echo "Docker Compose failed. Saving logs to 'failed_compose.log'"
    docker compose -f compose.yaml logs > failed_compose.log
else
    echo "Docker Compose was successful."
fi
