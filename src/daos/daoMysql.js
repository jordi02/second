import CRUDMysqlSQLIte from "../containers/contenedorMysqlSqlite.js";
import config from "../../configdb.js";

class daoMySQL extends CRUDMysqlSQLIte {
    constructor() {
        super(config.MySQL, "products");
    }
}

export default daoMySQL;