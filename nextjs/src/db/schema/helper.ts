import {index, IndexBuilder, PgColumn, timestamp, varchar} from "drizzle-orm/pg-core";
import {MRT_ColumnDef} from "material-react-table";
import {sql} from "drizzle-orm";

export function timestamps() {
  return {
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date()) // Automatically update on row update
      .notNull(),
    // deletedAt: timestamp("deleted_at"),
  };
}


type TableWithTimestamps = {
  createdAt?: PgColumn;
  updatedAt?: PgColumn;
  // deletedAt?: PgColumn;
};

type timestampIndexesResult = IndexBuilder[]

export function timestampIndexes<T extends TableWithTimestamps>(tableName: string, table: T) {
  const result: timestampIndexesResult = [];

  if (table.createdAt) {
    result.push(index(`${tableName}_created_at_idx`).on(table.createdAt))
  }

  if (table.updatedAt) {
    result.push(index(`${tableName}_updated_at_idx`).on(table.updatedAt))
  }

  // if (table.deletedAt) {
  //   result.deletedAtIdx = index(`${tableName}_deleted_at_idx`).on(table.deletedAt)
  // }

  return result;
}

export function timestampColumns<T extends {
  createdAt: Date;
  updatedAt: Date;
  // deletedAt: Date | null
}>(): (MRT_ColumnDef<T> & { defaultHide?: boolean })[] {
  return [
    {
      accessorKey: "createdAt",
      header: "Created At",
      size: 150,
      defaultHide: true,
      Cell: ({cell}) => cell.getValue<Date>()?.toLocaleDateString(), // convert back to string for display
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      size: 150,
      defaultHide: true,
      Cell: ({cell}) => cell.getValue<Date>()?.toLocaleDateString(), // convert back to string for display
    },
    // {
    //   accessorKey: "deletedAt",
    //   header: "Deleted At",
    //   size: 150,
    //   defaultHide: true,
    //   Cell: ({cell}) => cell.getValue<Date>()?.toLocaleDateString(), // convert back to string for display
    // },
  ]
}

export const ksuid = (name: string) => varchar(name, { length: 27 })
export const defaultKsuid = sql`ksuid()`
export const appId = () => ksuid("id").primaryKey().default(defaultKsuid)