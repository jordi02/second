import CRUDFireBase from "../../containers/contenedorFireBase.js";

class daoFirebase extends CRUDFireBase {
    constructor() {
        super("carts");
    }

    async createCart() {
        try {
            const cart = await this.create({ products: [] });
            return cart;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteCartItem(cartId, itemId) {
        try {
            const cart = await this.readById(cartId);
            const newCart = cart.items.filter((item) => item.id !== itemId);
            await this.update(cartId, { items: newCart });
        } catch (err) {
            console.log(err);
        }
    }

    // async addProduct(cartId, data) {
    //     try {
    //         await this.update(cartId, { product: data });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async addProduct(cartId, data) {
        try {
            const cart = await this.readById(cartId);
            const newCart = [...cart.products, data];
            await this.update(cartId, { products: newCart });
        } catch (err) {
            console.log(err);
        }
    }
}

export default daoFirebase;