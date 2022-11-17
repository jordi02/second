import express from 'express';
import { Router } from 'express';
import connection from '../../dbConnection/db.js';
import DBContainer from '../../dbConnection/contenedor.js';
const DB = new DBContainer(connection, 'products');
const router = Router();
const app = express();
app.use(express.json());


router.get("/", async (req, res) => {
  try {
    const data = await DB.getAll()
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await DB.getById(id);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});


router.post("/", async (req, res) => {
  try {
    const data = req.body;
    await DB.add(data);
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const prodNuevo = req.body;
    const idInt = parseInt(id);
    DB.update(idInt, prodNuevo);
    res.send(`Producto con id ${id} actualizado`);
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await DB.delete(id);
    res.send(`El producto con id ${id} fue eliminado`);
  } catch (err) {
    res.status(404).send(err.msg);
  }
});

export { router as productosRouter }

