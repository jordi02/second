import express from 'express';
import { Router } from 'express';
import daos from '../daos/index.js';
import isAuthorized from '../../middlewares/auth.js';
const { productos, carrito } = await daos;
const router = Router();
const app = express();
app.use(express.json());


router.get("/", async (req, res) => {
    try {
        const data = await carrito.read()
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await carrito.readById(id);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});


router.post("/", isAuthorized, async (req, res) => {
    try {
        const data = req.body;
        await carrito.createCart(data);
        res.send(data);
    } catch (err) {
        res.status(404).send(err);
    }
});

router.post("/:id/productos/:id_producto", isAuthorized, async (req, res) => {
    try {
        const { id, id_producto } = req.params;
        const ProductoCompleto = await productos.readById(id_producto);
        await carrito.addProduct(id, ProductoCompleto);
        res.send("Producto agregado al carrito");
    } catch (err) {
        res.status(404).send(err);
    }
});


router.put("/:id", isAuthorized, (req, res) => {
    try {
        const { id } = req.params;
        const prodNuevo = req.body;
        carrito.update(id, prodNuevo);
        res.send(`Producto con id ${id} actualizado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});

router.delete("/:id", isAuthorized, async (req, res) => {
    try {
        const { id } = req.params;
        await carrito.delete(id);
        res.send(`El producto con id ${id} fue eliminado`);
    } catch (err) {
        res.status(404).send(err.msg);
    }
});


export { router as carritoRouter }



