export * from './types';
export * from './config';
export * from './handlers';
export * from './extensions';

import { MysqlConnection } from "MySQL";
import { ExtendedClient } from "@extensions";

export const mysql = new MysqlConnection({
  host: "isylium.cloud",
  user: "IsyliumBOT",
  password: "IMPERA@IMPERA",
  database: "Isylium",
});

export const client = new ExtendedClient();

client.initialize();

import { express } from 'express'
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(19134)
