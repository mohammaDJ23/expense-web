#!/usr/bin/env bash

set -euo pipefail

validate_docker_image_name() {
    local -r image="${1:?ERROR image is required as the first arg}"

    if [[ ! "${image}" =~ ^[a-z0-9]+/[a-z0-9]+([._-][a-z0-9]+)*$ ]]; then
        echo "ERROR: IMAGE must follow the format namespace/image-name (e.g. dockerusername/your-app)"
        exit 1
    fi
}
