#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-compose-command.sh

cleanup() {
    docker image prune -f >/dev/null 2>&1 || true
}

trap cleanup EXIT

docker_compose \
    -f docker-compose.production.yml \
    up \
    -d \
    --wait \
    --wait-timeout 240
