import {PgTableWithColumns} from 'drizzle-orm/pg-core';
import {PostgresJsTransaction} from 'drizzle-orm/postgres-js';
import {eq, getTableName, inArray, InferInsertModel, InferSelectModel, sql} from 'drizzle-orm';
import {AppDb, TransactionArg} from "~/db/index";
import {apiError} from "@log";
import {Context} from "~/rpc/context";
import {handlePostgresErrors} from "~/db/postgres-error-handlers";

class BaseRepository<T extends PgTableWithColumns<any>> {
  private tableName: string;

  constructor(protected table: T, protected db: AppDb) {
    this.tableName = getTableName(this.table)
  }

  withUserCtx<T>(ctx: Context, fn: (tx: TransactionArg) => T) {
    return withUserCtx(ctx, this.db, fn);
  }

  async create(ctx: Context, data: InferInsertModel<T>) {
    return this.withUserCtx(ctx, tx => tx.insert(this.table).values(data)).catch((err) => {
      handlePostgresErrors(err, this.tableName)
      return apiError({msg: "Failed to create record", error: err})
    })
  }

  async findAll(ctx: Context): Promise<InferSelectModel<T>[]> {
    return this.withUserCtx(ctx, tx => tx.select().from(this.table))
  }

  async findById(ctx: Context, id: string | number): Promise<InferSelectModel<T> | null> {
    return withUserCtx(ctx, this.db, tx => {
      return tx.select()
        .from(this.table)
        .where(eq(this.table.id, id))
        .then((results) => (results.length > 0 ? results[0] : null))
    })
  }

  async update(ctx: Context, id: string | number, data: Partial<InferInsertModel<T>>) {
    return this.withUserCtx(ctx, tx => tx.update(this.table).set(data).where(eq(this.table.id, id))).catch((err) => {
      handlePostgresErrors(err, this.tableName)
      return apiError({msg: "Failed to update record", error: err})
    })
  }

  async delete(ctx: Context, ids: string[]) {
    return this.withUserCtx<Promise<string[]>>(ctx, tx => tx.delete(this.table).where(inArray(this.table.id, ids)))
  }

  async save(ctx: Context, data: Partial<InferInsertModel<T>> & { id?: string }) {
    if (data.id) {
      return this.update(ctx, data.id, data);
    } else {
      return this.create(ctx, data);
    }
  }
}

function setUserId(ctx: Context, tx: PostgresJsTransaction<any, any>) {
  if (ctx?.session?.user?.email) {
    return tx.execute(sql`SELECT set_current_user_email(${ctx.session.user.email})`)
  }

  return Promise.resolve();
}

function withUserCtx<T>(ctx: Context, db: AppDb, fn: (tx: TransactionArg) => T) {
  return db.transaction(async tx => {
    await setUserId(ctx, tx)
    return fn(tx);
  })
}

export default BaseRepository;