#!/bin/sh

set -e

get_names() {
    find . -type d -maxdepth 1 -name '[a-zA-Z0-9]*' \
        | sed 's/^\.\///g' \
        | sed 's/lib$//g' \
        | sed 's/opapp-preprocessor$//g'
}

generate() {
    local name="$1"
    local base="$(pwd)"

    echo "Generating $name ..."
    stack exec opapp-preprocessor -- "$name"
}

main() {
    local names="$(get_names)"
    for name in $names; do generate $name; done
}

main
