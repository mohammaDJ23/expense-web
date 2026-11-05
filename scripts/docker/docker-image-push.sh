#!/usr/bin/env bash

set -euo pipefail

push_to_docker_hub() {
    local -r image="${IMAGE:?ERROR IMAGE must provided as an env}"

    echo "Pushing image: ${image}"
    docker push "${image}"
    echo "Pushed: ${image}"
}
