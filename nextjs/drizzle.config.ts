import { defineConfig } from "drizzle-kit";
import env from '~/env';

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL_ADMIN,
  },
  verbose: true,
  strict: true,
  entities: {
    roles: true
  }
});