import CRUDMongo from "../../containers/contenedorMongo.js";


class daoMongo extends CRUDMongo {
    constructor() {
        super("carts", { productos: Array });
    }

    async createCart() {
        try {
            const cart = await this.create({ productos: [] });
            return cart;
        } catch (err) {
            console.log(err);
        }
    }

    async addProduct(id, ProductoCompleto) {
        try {
            const result = await this.db.updateOne({ _id: id }, { $push: { productos: ProductoCompleto } });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default daoMongo;