#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-compose-command.sh

cleanup() {
    docker image prune -f >/dev/null 2>&1 || true
}

trap cleanup EXIT

if ! docker_compose \
    -f docker-compose.production.yml \
    -f docker-compose.ci.yml \
    up \
    --build \
    -d \
    --wait \
    --wait-timeout 240
then
    docker_compose \
        -f docker-compose.production.yml \
        -f docker-compose.ci.yml \
        logs \
        --tail=300

    exit 1
fi
