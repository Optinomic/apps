#!/bin/sh

set -e

get_names() {
    find . -type d -maxdepth 1 -name '[a-zA-Z0-9]*' \
        | sed 's/^\.\///g' \
        | sed 's/lib$//g'
}

generate() {
    local name="$1"
    local path="$(pwd)"
    local version="$(cat $path/$name/VERSION)"
    local filename="$name-$version.opapp"

    echo Generating $filename ...
    cd "$path/$name"
    m4 "$path/helpers.m4" base.opapp.m4 > "$path/$filename"
    cd "$path"
}

main() {
    local names="$(get_names)"
    for name in $names; do generate $name; done
}

main
