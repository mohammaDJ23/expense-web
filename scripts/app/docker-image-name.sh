#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-image-versioned-name.sh
source ./scripts/docker/docker-image-latest-name.sh

IMAGE="mohammadnowresideh1997/expense-web-production"

create_versioned_docker_image_name "${IMAGE}"
create_latest_docker_image_name "${IMAGE}"
