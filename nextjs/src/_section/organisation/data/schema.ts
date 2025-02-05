import {pgEnum, pgTable, primaryKey, text, timestamp} from "drizzle-orm/pg-core";
import {createInsertSchema, createSelectSchema, createUpdateSchema} from "drizzle-zod";
import {z} from "zod";
import {relations} from "drizzle-orm";
import {userTable} from "~/_section/user/data/schema";
import {appId, ksuid, timestamps} from "@schema/helper";

// Define enum for user roles within an organisation
export const orgUserRoleEnum = pgEnum("orgUserRole", ["OWNER", "EMPLOYEE"]);

export const organisationTable = pgTable("organisation", {
  id: appId(),
  displayName: text("displayName").unique().notNull(),
  legalName: text("legalName").notNull(),
  ...timestamps(),
});

export const organisationUserTable = pgTable("organisationUser", {
    orgId: ksuid("orgId").references(() => organisationTable.id, {onDelete: "cascade"}),
    userId: ksuid("userId").references(() => userTable.id, {onDelete: "cascade"}),
    role: orgUserRoleEnum("role").notNull(),  // Enum field for role within the organisation
    joinedAt: timestamp("joinedAt").defaultNow(),
  }, (t) => [
    {
      compositePK: primaryKey({
        columns: [t.userId, t.orgId],
      }),
    },
  ]
);

export const insertSchema = createInsertSchema(organisationTable, { displayName: z.string().min(5).max(200) }).omit({id: true, createdAt: true})
export const updateSchema = createUpdateSchema(organisationTable).omit({createdAt: true, updatedAt: true})
export const selectSchema = createSelectSchema(organisationTable)

export const organisationRelations = relations(organisationTable, ({many}) => ({
  users: many(organisationUserTable),
}));

export const organisationUserRelations = relations(organisationUserTable, ({one}) => ({
  user: one(userTable, {
    fields: [organisationUserTable.userId],
    references: [userTable.id],
  }),
  organisation: one(organisationTable, {
    fields: [organisationUserTable.orgId],
    references: [organisationTable.id],
  }),
}));

export type Organisation = z.infer<typeof selectSchema>;