import CRUDMongo from "../containers/contenedorMongo.js";

class daoMongo extends CRUDMongo {
    constructor() {
        super("products", { title: String, price: Number, stock: Number, description: String, thumbnail: String });
    }
}

export default daoMongo;