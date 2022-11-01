import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.TIPO_DB)

const daos = {
    Mongo: async () => {
        const { default: daoMongo } = await import("./daoMongo.js");
        return new daoMongo();
    },
    Mysql: async () => {
        const { default: daoMysql } = await import("./daoMysql.js");
        return new daoMysql();
    },
    Firebase: async () => {
        const { default: daoFirebase } = await import("./daoFirebase.js");
        return new daoFirebase();
    },
    Sqlite: async () => {
        const { default: daoSqlite } = await import("./daoSQLite3.js");
        return new daoSqlite();
    }
}

export default daos[process.env.TIPO_DB]();