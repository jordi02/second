//Libs
import express from 'express';
import handlebars from "express-handlebars";
const app = express();

// DB
import CRUDMysqlSQLIte from './src/containers/contenedorMysqlSqlite.js';
import config from "./configdb.js";
const DBMensajes = new CRUDMysqlSQLIte(config.SQLite3, 'messages');
const DBProductos = new CRUDMysqlSQLIte(config.MySQL, 'products');

// Constructor de productos y router

import { productosRouter } from './src/routes/productos.js';

//Socket server
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));


//Array del chat
let mensajes = [{ email: "bienvenida@chat.com", msg: "Bienvenido al chat", date: "01/01/2021 00:00:00" }];

/////////////////////////
// SOCKET IO ////////////
/////////////////////////

io.on("connection", async (socket) => {
  console.log("Se ha conectado un cliente");
  socket.emit('new-message', mensajes);
  socket.on('new-message', async (data) => {
    await DBMensajes.create(data);
    mensajes.push(data);
    io.sockets.emit('new-message', mensajes);
  });
  socket.emit('new-product', await DBProductos.read());
  socket.on('new-product', async (data) => {
    await DBProductos.create(data);
    const productos = await DBProductos.read();
    io.sockets.emit('new-product', productos);
  });
});

/////////////////////////
// HANDLE BARS VIEWS/////
/////////////////////////
app.engine(
  "hbs",
  handlebars.engine({
    extname: "hbs",
    layoutsDir: "./views",
    defaultLayout: "main",
  })
);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  res.render("root", {
    layout: "root",
    title: "Página principal",
    Precio: "Precio",
    addProd: "Añadir Producto",
    compras: await DBProductos.read(),
    noProd: "No hay productos",
    partialsPath: "./views/partials",
  });
});


/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use("/productos", productosRouter);

/////////////////////////
// SERVER ON ////////////
/////////////////////////
httpServer.listen(3000, () => {
  console.log("Server ON");
});
