import db from "@db";
import env from "~/env";
import {userTable} from "~/db/schema";
import goCatch from "~/helpers/go-catch";
import {hashPassword} from "~/helpers/password";
import {sql} from "drizzle-orm";

async function seed() {
  console.log("seeding the database");

  if (!env.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seed');
  }

  // Insert default user
  const [hash, err] = await goCatch(hashPassword("Password1!"))
  if (err) {
    console.error("could not hash password");
    throw err
  }

  const adminUser = await db.insert(userTable).values({
    email: "admin@oscatel.net",
    emailVerified: new Date(),
    passwordHash: hash,
    passwordSetAt: new Date(),
    role: "admin",
  }).onConflictDoNothing().returning();

  await db.execute(sql`
      alter role api with login password 'password';
      grant select, insert, update, delete on all tables in schema public TO api;
      alter default privileges in schema public grant select, insert, update, delete on tables to api;
  `);

  const userA = await db.insert(userTable).values({
    email: "userA@email.net",
    emailVerified: new Date(),
    passwordHash: hash,
    passwordSetAt: new Date(),
    role: "basic",
  }).onConflictDoNothing().returning();

  const userB = await db.insert(userTable).values({
    email: "userB@email.net",
    emailVerified: new Date(),
    passwordHash: hash,
    passwordSetAt: new Date(),
    role: "basic",
  }).onConflictDoNothing().returning();
}

seed().then(() => {
  console.log("seeding done");
  process.exit(0);
})