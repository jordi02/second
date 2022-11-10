import express from 'express';
import { Router } from 'express';
import daos from '../daos/index.js';
import isAuthorized from '../../middlewares/auth.js'
const { productos } = await daos;
const router = Router();
const app = express();
app.use(express.json());


router.get("/", async (req, res) => {
  try {
    const data = await productos.read()
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await productos.readById(id);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});


router.post("/", isAuthorized, async (req, res) => {
  try {
    const data = req.body;
    await productos.create(data);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/:id", isAuthorized, (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    const idInt = parseInt(id);
    productos.update(idInt, prodNuevo);
    res.send(`Producto con id ${id} actualizado`);
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

router.delete("/:id", isAuthorized, async (req, res) => {
  try {
    const { id } = req.params;
    await productos.delete(id);
    res.send(`El producto con id ${id} fue eliminado`);
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

export { router as productosRouter }

