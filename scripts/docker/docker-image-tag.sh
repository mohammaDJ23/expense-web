#!/usr/bin/env bash

set -euo pipefail

tag_docker_image() {
    local -r source="${SOURCE:?ERROR SOURCE image must be provided as an env}"
    local -r target="${TARGET:?ERROR TARGET image must be provided as an env}"

    echo "Tagging ${source} -> ${target}"
    docker tag "${source}" "${target}"
    echo "Tagged ${source} -> ${target}"
}
