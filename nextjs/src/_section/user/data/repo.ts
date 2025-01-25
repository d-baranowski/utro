import BaseRepository from "~/db/base-repository";
import {userTable} from "~/_section/user/data/schema";
import db, {AppSchema} from "@db";
import {PostgresJsDatabase} from "drizzle-orm/postgres-js";


export class UserRepository extends BaseRepository<typeof userTable> {
  constructor(db: PostgresJsDatabase<AppSchema>) {
    super(userTable, db);
  }

  async findByEmail(email: string) {
    return this.db.query.userTable.findFirst({
        where: (users, { eq }) => eq(users.email, email),
    });
  }
}

const userRepository = new UserRepository(db);
export default userRepository;