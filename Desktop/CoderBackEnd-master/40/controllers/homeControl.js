const ObjectInterface = require('../db/mongooseObjIface')
const ProductDto = require('../db/dtos/productosDto')
const logger = require('./logControl').logger;
const productsHelper = ObjectInterface.getProductosHelper()
const path = require('path');

async function renderHomePage(req, res) {
    const io = req.app.get('socketio')
    let products
    try{
        products = await productsHelper.getAll()
    }
    catch (err){
        logger.error(err)
    }
    let name = req.user.username
    res.sendFile(path.join(__dirname, '..', '..', '40-Persistencia/views/home.html'))
    try {
        io.on('connection', async (socket) => {         
            socket.emit("currentData", name)
            socket.emit("currentProducts", products)
        })
    }
    catch (err) {
        logger.error("Failed to connect socket" + err)
    }
}

async function createNewProduct(req, res) {
    let product = new ProductDto(
                    req.body.name,
                    req.body.price,
                    req.body.thumbnail
                )
    await productsHelper.insert(product)
    const io = req.app.get('socketio')
    const allProducts = await productsHelper.getAll()
    io.sockets.emit("currentProducts", allProducts)
    res.send(`Se guardo el objeto.`)
}

async function renderErrorPage(req, res) { // TODO: hacer mas linda/completa esta vista
    if (!req.headers.referer) {
        res.render('error', {data: 'Hubo un error con tu solicitud'})
        } else {
            if (req.headers.referer.endsWith('login')) {
                res.render('error', {data: 'Hubo un error al iniciar sesion'})
            }
            if (req.headers.referer.endsWith('register')) {
                res.render('error', {data: 'No se pudo registrar tu cuenta'})
            }
        }
}

async function renderInfoPage(req, res) {
    data = {
        'arguments': process.argv,
        'platform': process.platform,
        'node-version': process.version,
        'memory': process.memoryUsage.rss(),
        'execpath': process.execPath,
        'pid': process.pid,
        'folder': process.execPath,
        'cpus': cpus
    }
    res.render('info', {data: data})
}

exports.renderHomePage = renderHomePage
exports.createNewProduct = createNewProduct
exports.renderErrorPage = renderErrorPage
exports.renderInfoPage = renderInfoPage