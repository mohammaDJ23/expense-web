#!/usr/bin/env bash

set -euo pipefail

source ./scripts/docker/docker-image-push.sh

push_to_docker_hub
