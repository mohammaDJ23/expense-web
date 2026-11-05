#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-image-name-validator.sh

create_latest_docker_image_name() {
    local -r image="${1:-}"
    validate_docker_image_name "${image}"

    local -r latest_image="${image}:latest"

    echo "The created latest image is: ${latest_image}"

    if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
        echo "latest_image=${latest_image}" >> "$GITHUB_OUTPUT"
        
        echo "✓ GitHub output set: latest_image=${latest_image}"
    fi
}
