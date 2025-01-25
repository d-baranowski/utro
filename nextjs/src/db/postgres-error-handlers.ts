import {PostgresError} from "postgres";
import {UNIQUE_VIOLATION} from "~/db/pg-error-constants";
import {apiError} from "@log";
import {fromUniqueIndexName} from "~/db/unique-index-name";

export function handlePostgresErrors(err: Error, tableName: string) {
  if (err.name === "PostgresError") {
    const errPg = err as PostgresError
    if (errPg.code === UNIQUE_VIOLATION && errPg.constraint_name) {
      return apiError({
        error: err,
        msg: "Record already exists",
        validation: {
          [fromUniqueIndexName(errPg.constraint_name, tableName)]: "This value must be unique",
        }
      })
    }
  }
}