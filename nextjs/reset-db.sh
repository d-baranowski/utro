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

# Check if ./migrations/0000_init.sql exists
if [[ -f "./migrations/0000_init.sql" ]]; then
  echo "./migrations/0000_init.sql exists. Creating a backup..."
  cp ./migrations/0000_init.sql ./0000_init_backup.sql
elif [[ -f "./0000_init_backup.sql" ]]; then
  echo "./migrations/0000_init.sql does not exist, but a backup exists. Skipping copy step."
else
  echo "Error: Neither ./migrations/0000_init.sql nor ./0000_init_backup.sql exists."
  exit 1
fi

rm -rf migrations
docker compose up -d
pnpm run db:add-migration --name=init

# Move the backup back if it exists
if [[ -f "./0000_init_backup.sql" ]]; then
  mv ./0000_init_backup.sql ./migrations/0000_init.sql
fi

pnpm run db:generate
pnpm run db:migrate
pnpm run db:seed