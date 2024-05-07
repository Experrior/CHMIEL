#!/bin/bash

docker rm -f chmiel_db_local
docker build . -f Dockerfile_db -t chmiel_db
docker run -d -p 5432:5432 -e 'POSTGRES_DB=ChmielDB' -e 'POSTGRES_USER=admin' -e 'POSTGRES_PASSWORD=test'  --name chmiel_db_local chmiel_db
