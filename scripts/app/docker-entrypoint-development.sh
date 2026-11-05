#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-compose-command.sh

cleanup() {
    docker image prune -f >/dev/null 2>&1 || true
}

trap cleanup EXIT

docker_compose \
    -f docker-compose.development.yml \
    up \
    --build \
    -d \
    --wait \
    --wait-timeout 240
