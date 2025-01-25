import { snakeCase, camelCase } from "change-case";

const uniqueIndexSuffix = "_unique_index"

export const toUniqueIndexName = (field: string, tableName: string) => {
  return snakeCase(field) + "_" + tableName + uniqueIndexSuffix;
}

export const fromUniqueIndexName = (constrainName: string, tableName: string) => {
  return camelCase(constrainName.replace(uniqueIndexSuffix, "").replace(tableName, ""))
}