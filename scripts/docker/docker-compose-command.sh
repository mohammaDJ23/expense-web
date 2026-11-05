#!/usr/bin/env bash

set -euo pipefail

docker_compose() {
    local cmd=""
    
    if command -v docker-compose >/dev/null 2>&1; then
        cmd="docker-compose"
    elif docker compose version >/dev/null 2>&1; then
        cmd="docker compose"
    else
        echo "Docker Compose not found"
        exit 1
    fi
    
    ${cmd} "$@"
}
