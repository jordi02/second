//Libs
import express from 'express';
const app = express();

// Constructor de productos y router
import { productosRouter } from './src/routes/productos.js';
import { carritoRouter } from './src/routes/carrito.js';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

/////////////////////////
// SERVER ON ////////////
/////////////////////////
app.listen(3000, () => {
  console.log("Server ON");
});
