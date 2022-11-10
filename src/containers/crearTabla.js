//Config DB
import knex from 'knex';
import config from "../../configdb.js";

const KnexSQLite3 = knex(config.SQLite3)
KnexSQLite3.schema.createTableIfNotExists("messages", (table) => {
    table.increments("id");
    table.string("date");
    table.string("email");
    table.string("msg");
}).then(() => {
    console.log("Table created");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    KnexSQLite3.destroy();
});



