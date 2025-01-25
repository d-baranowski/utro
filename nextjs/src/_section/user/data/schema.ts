import {index, pgTable, text, timestamp} from "drizzle-orm/pg-core";
import {createInsertSchema, createUpdateSchema} from "drizzle-zod";
import {toUniqueIndexName} from "~/db/unique-index-name";
import {InferSelectModel} from "drizzle-orm";
import {appId} from "@schema/helper";

export const tableName = "user"
export const userTable = pgTable(tableName, {
  id: appId(),
  name: text("name"),
  email: text("email").unique(toUniqueIndexName("email", tableName)).notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  passwordHash: text("password_hash"),
  passwordSetAt: timestamp("password_set_at").defaultNow(),
  role: text({enum: ["basic", "admin"]}),
}, (table) => {
  return [
    index("users_email_idx").on(table.email)
  ];
});

export const userInsertSchema = createInsertSchema(userTable);
export const userUpdateSchema = createUpdateSchema(userTable);

export type User = InferSelectModel<typeof userTable>;