const logger = require('./logControl').logger;
const ObjectInterface = require('../db/mongooseObjIface')
const CarritoDto = require('../db/dtos/carritosDto')
const Carritos = ObjectInterface.getCarritosModel()
const carritos = ObjectInterface.getCarritosHelper()
const Productos = ObjectInterface.getProductosModel();

async function crearCarritoVacio(req, res, redirect) {
    let reqUser = req.user.username
    let query = Carritos.findOne({username: reqUser})
    if (query.count() > 0) {
        logger.error('falla de logica, se intento generar un carrito para un usuario que ya tiene uno')
        logger.error('Corresponde hacer un update o eliminarlo y crear uno nuevo')
        if (redirect) { res.redirect(redirect) }
    } else {
        let newCarrito = new CarritoDto(username, [])
        try {
        carritos.insert(newCarrito)
        logger.info(`se creo un carrito vacio para ${reqUser}`)
        res.redirect('/')
        } catch(e) {
            logger.error(e)
        }
    }
}

async function agregarProductoACarrito(req, res, productId, redirect) {
    let reqUser = req.user.username
    let query = await Carritos.find({username: reqUser})
    if (query.count <= 0) {
        logger.error('se intento agregar un producto a un carrito que no existe')
        crearCarritoVacio(req, res, false)
    }
    let product = await Productos.findOne({_id: productId})
    await Carritos.findOneAndUpdate({username: reqUser}, {"$push":{items:product}})
    logger.info(`se agrego el producto ${productId} al carrito de ${reqUser}`)
    if (redirect) res.redirect(redirect)
}

async function borrarProductoDeCarrito(req, res, productId, redirect) { 
    let reqUser = req.user.username
    let carritoQuery = await Carritos.findOne({username: reqUser}).lean()
    if (carritoQuery == [] || carritoQuery == null) { 
        logger.error('se intento eliminar un producto de un carrito que no existe')
    } else {
        let productoQuery = await Productos.findOne({_id: productId}).lean()
        if (productoQuery.count <= 0) { 
            logger.error('se intento eliminar un producto inexistente de un carrito existente')
            return res.redirect('/')
        } else {
            let productIdx = carritoQuery.items.findIndex(
                (product) => {return product._id.toString() == productId.toString() }
            )
            carritoQuery.items.splice(productIdx, 1)
            await Carritos.findOneAndUpdate({username: reqUser}, {items: carritoQuery.items})
            logger.info(`se elimino el producto ${productId} del carrito de ${reqUser}`)
            if (redirect) { res.redirect(redirect) } else { res.redirect('/') }
        }
    }
}

async function vaciarCarrito(req, res, redirect, bought) {
    let reqUser = req.user.username
    let carritoQuery = await Carritos.findOne({username: reqUser}).lean()
    if (carritoQuery.count <= 0) {
        logger.error(`se intento vaciar un carrito que no existe, como llegaste hasta aca?`)
    } else {
        await Carritos.findOneAndUpdate({username: reqUser}, {items: []})
    }
    if (bought) {
        logger.info(`se vacio el carrito de ${reqUser} dada su compra`)
    } else {
        logger.info(`${reqUser} vacio su carrito porque probablemente no queria nada (o no le da la guita!)`)
    }
    if (redirect) {res.redirect(redirect)}
    else {res.redirect('/')}
}

exports.crearCarritoVacio = crearCarritoVacio
exports.agregarProductoACarrito = agregarProductoACarrito
exports.borrarProductoDeCarrito = borrarProductoDeCarrito
exports.vaciarCarrito = vaciarCarrito