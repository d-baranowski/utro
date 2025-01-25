import {drizzle, PostgresJsDatabase} from 'drizzle-orm/postgres-js';
import postgres from "postgres";
import * as schema from "./schema"
import env from "~/env";

export const connection = postgres((env.DB_MIGRATING || env.DB_SEEDING) ? env.DB_URL_ADMIN : env.DB_URL_API, {
  max: (env.DB_MIGRATING || env.DB_SEEDING) ? 1 : undefined,
  onnotice: env.DB_SEEDING ? () => {
  } : undefined,
});

export const db = drizzle(connection, {
  schema,
  logger: true,

});

export type db = typeof db;

export type AppSchema = typeof schema;

export type AppDb = PostgresJsDatabase<AppSchema>
export type TransactionArg = Parameters<Parameters<AppDb['transaction']>[0]>[0];

export default db;