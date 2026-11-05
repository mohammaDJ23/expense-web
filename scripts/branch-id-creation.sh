#!/usr/bin/env bash

set -euo pipefail

ID_FILE=".git/branch-ids.json"

generate_short_id() {
    local timestamp microsecond_part random_hex random_dec random_part id
    
    if [[ "${OSTYPE}" == "darwin"* ]]; then
        timestamp=$(python -c 'import time; print(int(time.time() * 1000000))' 2>/dev/null || \
            date +%s%6N 2>/dev/null || \
            echo "$(date +%s)000000")
    else
        timestamp=$(date +%s%6N 2>/dev/null || \
            echo "$(date +%s)000000")
    fi
    
    timestamp="${timestamp: -6}"
    
    random_hex=$(od -An -N2 -x < /dev/urandom | tr -d ' ')
    random_dec=$((0x${random_hex} % 1000))
    random_part=$(printf "%03d" "${random_dec}")
    
    id="${timestamp: -3}${random_part}"
    
    echo "${id:0:6}"
}

load_existing_ids() {
    local ids_data
    
    if [[ -f "${ID_FILE}" ]]; then
        if command -v jq >/dev/null 2>&1; then
            ids_data=$(jq -c '.' "${ID_FILE}" 2>/dev/null || echo '{"ids":[],"lastGenerated":null}')
        else
            ids_data=$(cat "${ID_FILE}" 2>/dev/null || echo '{"ids":[],"lastGenerated":null}')
        fi
    else
        ids_data='{"ids":[],"lastGenerated":null}'
    fi
    
    echo "${ids_data}"
}

save_ids() {
    local ids_data="$1"
    local dir
    
    dir=$(dirname "${ID_FILE}")
    
    if [[ ! -d "${dir}" ]]; then
        mkdir -p "${dir}"
    fi
    
    if command -v jq >/dev/null 2>&1; then
        echo "${ids_data}" | jq '.' > "$ID_FILE"
    else
        echo "${ids_data}" > "$ID_FILE"
    fi
}

extract_ids() {
    local json_data="$1"
        
    if command -v jq >/dev/null 2>&1; then
        echo "${json_data}" | jq -r '.ids[]?' 2>/dev/null
    else
        echo "${json_data}" | grep -o '"ids":\[[^]]*\]' | sed 's/"ids":\[//;s/\]//;s/"//g' | tr ',' '\n' | grep -v '^$'
    fi
}

update_json_with_id() {
    local existing_json="$1"
    local new_id="$2"
    
    if command -v jq >/dev/null 2>&1; then
        last_generated=$(date -Iseconds)
        echo "${existing_json}" | jq --arg id "${new_id}" --arg date "${last_generated}" \
            '.ids += [$id] | .ids = .ids[-500:] | .lastGenerated = $date'
    else
        local ids_list=$(extract_ids "${existing_json}")
        local updated_ids=$(echo -e "${ids_list}\n${new_id}" | tail -n 500 | grep -v '^$')
        
        local json_ids=""
        while read -r id; do
            [[ -z "${id}" ]] && continue

            if [[ -n "${json_ids}" ]]; then
                json_ids="${json_ids},"
            fi
            
            json_ids="${json_ids}\"${id}\""
        done <<< "$updated_ids"
        
        local last_generated=$(date -Iseconds)
        echo "{\"ids\":[${json_ids}],\"lastGenerated\":\"${last_generated}\"}"
    fi
}

generate_unique_id() {
    local ids_data existing_ids id attempts=0 max_attempts=10
    local new_json
    
    ids_data=$(load_existing_ids)
    existing_ids=$(extract_ids "${ids_data}")
    
    while true; do
        id=$(generate_short_id)
        attempts=$((attempts + 1))
        
        if ! echo "${existing_ids}" | grep -q "^${id}$"; then
            break
        fi
        
        if [[ $attempts -gt $max_attempts ]]; then
            if [[ "${OSTYPE}" == "darwin"* ]]; then
                id=$(python -c 'import time; print(str(int(time.time() * 1000000))[-6:])' 2>/dev/null || \
                    date +%s%N | tail -c 7)
            else
                id=$(date +%s%N | tail -c 7)
            fi
            break
        fi
    done
    
    new_json=$(update_json_with_id "${ids_data}" "${id}")
    save_ids "${new_json}"
    
    echo "${id}"
}

main() {
    if id=$(generate_unique_id) >/dev/null; then
        echo "Created Branch ID: ${id}"
        echo "Use this ID in your branch name:"
        echo "Example: feature/${id}--add-user-authentication"
        return 0
    fi

    echo "Failed to create an id"
    return 1
}

main

exit $?
