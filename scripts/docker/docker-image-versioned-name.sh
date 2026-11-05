#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-image-tag-validator.sh
source ./scripts/docker/docker-image-name-validator.sh

create_versioned_docker_image_name() {
    local -r image="${1:-}"
    validate_docker_image_name "${image}"

    local -r tag="${TAG:-}"
    validate_docker_image_tag "${tag}"

    local -r versioned_image="${image}:${tag}"

    echo "The created versioned image is: ${versioned_image}"

    if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
        echo "versioned_image=${versioned_image}" >> "$GITHUB_OUTPUT"

        echo "✓ GitHub output set: versioned_image=${versioned_image}"
    fi
}
