import { MysqlConnection } from "MySQL";

export const mysql = new MysqlConnection({
  host: "isylium.cloud",
  user: "IsyliumBOT",
  password: "IMPERA@IMPERA",
  database: "Isylium",
});

export * from './types';
export * from './handlers';
export * from './extensions';