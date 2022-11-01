import CRUDMysqlSQLIte from "../containers/contenedorMysqlSqlite.js";
import config from "../../configdb.js";


class daoSQLite3 extends CRUDMysqlSQLIte {
    constructor() {
        super(config.SQLite3, "messages");
    }
}


export default daoSQLite3;