//Config DB
import knex from 'knex';
//import connection from './db.js';
import sqliteConfig from './SQLite3.js';

//const KnexMySQL = knex(connection)
const KnexSQLite3 = knex(sqliteConfig)

KnexSQLite3.schema.createTable("messages", (table) => {
    table.increments("id");
    table.string("date");
    table.string("name");
    table.string("apellido")
    table.string("alias");
    table.string("avatar");
    table.integer("edad");
    table.string("email");
    table.string("msg");
}).then(() => {
    console.log("Table created");
}).catch((err) => {
    console.log(err);
}).finally(() => {
    KnexSQLite3.destroy();
});

// KnexMySQL.schema.createTableIfNotExists("products", (table) => {
//     table.increments("id");
//     table.string("title");
//     table.integer("price");
//     table.integer("stock");
//     table.string("Descripcion");
//     table.string("thumbnail");
// }).then(() => {
//     console.log("Table created");
// }).catch((err) => {
//     console.log(err);
// }).finally(() => {
//     KnexMySQL.destroy();
// });

