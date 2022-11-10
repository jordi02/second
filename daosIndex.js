import daos from "./src/daos/index.js";

// Este archivo es para testear el funcionamiento de los DAOs

(async () => {
    try {
        const { productos, carrito } = await daos;
        const prod = await productos.read();
        console.log(prod);
        const cart = await carrito.read();
        console.log(cart);
    } catch (err) {
        console.log(err);
    }
})();

