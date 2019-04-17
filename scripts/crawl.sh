#!/usr/bin/env bash
set -eu

usage() {
  echo "Usage:
  $0 all
  $0 <tag>
  $0 -h
"
  exit
}

main() {
  local tag="$1"
  rm -f "./data/${tag}.jsonl"
  scrapy crawl methods -a "tag=${tag}" -o "./data/${tag}.jsonl" -t jsonlines
  sort "./data/${tag}.jsonl" | sed -e '1i\\[' -e '$!s/$/,/' -e '$a\\]' > "./data/${tag}.json"
}

case "${1:--h}" in
  -h)
    usage
    ;;
  all)
    for tag in v5.2; do
      main $tag
    done
    ;;
  *)
    main "$1"
    ;;
esac
