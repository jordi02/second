//Libs
import express, { application, json } from 'express';
import handlebars from "express-handlebars";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { fork } from "child_process";
const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express();

// DB
import DBContainer from './dbConnection/contenedor.js';
import mysqlconnection from './dbConnection/db.js';
import sqliteConfig from './dbConnection/SQLite3.js';
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const DBMensajes = new DBContainer(sqliteConfig, 'messages');
const DBProductos = new DBContainer(mysqlconnection, 'products');

//YARGS
import Yargs from 'yargs/yargs';
const yargs = Yargs(process.argv.slice(2));

const serverPort = yargs.alias({
  p: "port",
}).default(
  { port: 8080 }
).argv

// routers
import { productosRouter } from './src/routes/productos.js';
import { usersRouter } from './src/routes/usuarios.js';

// Normalizador de mensajes
import Normalizr from './normalizr.js';

//Socket server
import { Server } from 'socket.io';
import { createServer } from 'http';
const httpServer = createServer(app);
const io = new Server(httpServer);

//middlewares


//Configuraciones
app.use(cookieParser('kfjcu3977qhh214mm8rq723'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

//sesion de mongo
app.use(session({
  secret: 'm34km24m2k4',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/ecommerce',
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  })
}))

/////////////////////////
// SOCKET IO ////////////
/////////////////////////

io.on("connection", async (socket) => {
  console.log("Se ha conectado un cliente");
  //Mensajes
  //socket.emit('data-normalizada', await Normalizr());
  //back
  socket.emit('new-message', await Normalizr());
  socket.on('new-message', async (data) => {
    await DBMensajes.add(data);
    io.sockets.emit('new-message', await Normalizr());
  });

  //Productos
  socket.emit('new-product', await DBProductos.getAll());
  socket.on('new-product', async (data) => {
    await DBProductos.add(data);
    const productos = await DBProductos.getAll();
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
  if (req.session.user) {
    res.render("root", {
      layout: "root",
      title: "Página principal",
      Precio: "Precio",
      addProd: "Añadir Producto",
      name: req.session.user,
      compras: await DBProductos.getAll(),
      noProd: "No hay productos",
      partialsPath: "./views/partials",

    })
  }
  else {
    res.redirect('/login')
  }
});

app.use("/info", (req, res) => {
  res.render("info", {
    layout: "info",
    title: "Información",
    args: JSON.stringify(process.argv, null, "\t"),
    so: process.platform,
    version: process.version,
    memory: process.memoryUsage().rss,
    path: process.cwd(),
    processID: process.pid,
    proyectFolder: __dirname
  })
})



/////////////////////////
// EXPRESS ROUTER ///////
/////////////////////////

app.use("/productos", productosRouter);
app.use("/", usersRouter);

//Random

const CON_CHILD_PROCESS_FORK = !false;
if (CON_CHILD_PROCESS_FORK) {
  let calculo = fork("./computo.js");

  var taskId = 0;
  var tasks = {};

  function addTask(data, callback) {
    var id = taskId++;
    calculo.send({ id: id, data: data });
    tasks[id] = callback;
  }

  calculo.on("message", function (message) {
    tasks[message.id](message);
  });

  app.get("/randoms", async (req, res) => {
    addTask(req.query.cant || 1000, (randoms) => {
      res.json(randoms);
    });
  });
} else {
  app.get("/randoms", async (req, res) => {
    res.send('<h2 style="color: orangered;">randoms -> no implementado!</h2>');
  });
}

///////////////////////
// SERVER ON ////////////
/////////////////////////
httpServer.listen(serverPort.port, () => {
  console.log("Server escuchando en el puerto " + serverPort.port);
});
