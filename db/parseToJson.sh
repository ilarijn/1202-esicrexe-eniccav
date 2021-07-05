#!/bin/sh
for f in *.source; do
    sed -r 's/(\{.*\})/\1,/' "$f" >"${f%.source}.json"
    sed -i -r '1s/(.*)/[\1/' "${f%.source}.json"
    sed -i -r '$ s/(\{.*\}),/\1]/' "${f%.source}.json"
done