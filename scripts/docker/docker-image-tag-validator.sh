#!/usr/bin/env bash

set -euo pipefail

validate_docker_image_tag() {
    local -r tag="${1:?ERROR tag is required as the first arg}"

    if [[ ! "${tag}" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "ERROR: TAG must follow the format X.Y.Z (e.g. 2.234.242)"
        exit 1
    fi
}
