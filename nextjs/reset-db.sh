#!/bin/bash -x

exit_trap () {
  local lc="$BASH_COMMAND" rc=$?
  if [[ $rc -ne 0 ]]; then
    echo "Command [$lc] exited with code [$rc]"
    exit $rc
  fi
}

trap exit_trap EXIT

set -e

docker compose down --volumes
cp ./migrations/0000_init.sql ./0000_init_backup.sql
rm -rf migrations
docker compose up -d
pnpm run db:add-migration --name=init
mv ./0000_init_backup.sql ./migrations/0000_init.sql
pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed