const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')
const Schema = require('mongoose').Schema
const mongoose = require('mongoose');


const isAuth = require('./home').isAuth

const logger = require('../app/logger');
const { query } = require('express');

const cSchema = new Schema({ 
    username: {type: String, required: true},
    items: {type: Array, required: true}
 })

const pSchema = require('../routes/home').productSchema

let carritos = new MongoHelper('carritos', cSchema)
let Carritos = mongoose.model('Carritos', cSchema)

let productos = new MongoHelper('products', pSchema)


async function crearCarritoVacio(req, res, redirect) {
    let reqUser = req.user.username
    let query = Carritos.findOne({username: reqUser})
    if (query.count() > 0) {
        logger.error('falla de logica, se intento generar un carrito para un usuario que ya tiene uno')
        logger.error('Corresponde hacer un update o eliminarlo y crear uno nuevo')
        if (redirect) { res.redirect(redirect) }
    } else {
        let newCarrito = {
            'username': reqUser,
            'productos': []
        }
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
    let query = Carritos.findOne({username: reqUser})
    if (query.count() < 0) {
        logger.error('se intento agregar un producto a un carrito que no existe')
        crearCarritoVacio(req, res, false)
    }
    await Carritos.findOneAndUpdate({username: reqUser}, {"$push":{items:productId}}, {new:true})
    logger.info(`se agrego el producto ${productId} al carrito de ${reqUser}`)
    if (redirect) res.redirect(redirect)
}


router.get('/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    agregarProductoACarrito(req, res, idprod, '/')
})


router.get('/:id/productos', async (req, res)=>{
    let currentData
    const { id } = req.params
    try {
        currentData = await carritos.getByID(id)
    }
    catch (err){
        logger.error(err)
    }
    if(currentData){
        res.send(currentData)
    }
    else{
        res.send({error: 'Carrito no encontrado'})
    }
})

// esto lo voy a usar para mostrar todos los productos en el carrito del usuario logueado
router.get('/', isAuth, async (req, res)=>{
})

router.delete('/:id', async (req, res) =>{
    const id = req.params.id

    let carrito
    try{
        carrito = await carritos.getByID(id)
    }
    catch (err){
        logger.error(err)
    }

    if(carrito){
        carritos.delete(id)
        res.send(`El carrito con ID ${id} fue eliminado`)
    }
    else{
        res.send({error: 'Carrito no encontrado'})
    }
})


router.post('/:id/productos/:idprod', async (req, res)=>{
    const id = req.params.id
    const idprod = req.params.idprod
    let carrito
    let product
    try{
        carrito = await carritos.getByID(id)
        product = await productos.getByID(idprod)
    }
    catch (err){
        logger.error(err)
    } 

    if(carrito && product){
        carrito.productos.push(product)
        carritos.update(id, carrito)
        res.send(`Se agrego el producto de ID ${idprod} al carrito ${id}`)
    }
    else{
        res.send({error: 'Carrito o producto a agregar no encontrado'})
    }
})

router.delete('/:id/productos/:idprod', async (req, res) =>{
    const id = req.params.id
    const idprod = req.params.idprod

    let carrito
    try{
        carrito = await carritos.getByID(id)
    }
    catch (err){
        logger.error(err)
    }
    if(carrito){
        let productos = carrito.productos
        let productoABorrar = productos.findIndex(x => x._id.toString() === idprod)
        if (productoABorrar == -1){
            res.send({error: 'El producto no fue encontrado'})
        }
        else{
            productos.splice(productoABorrar, 1)
            carrito.productos = productos
            carritos.update(id, carrito)
            res.send(`Se elimino un producto de ID ${idprod} del carrito ${id}`)

        }
    }
    else{
        res.send({error: 'El carrito no fue encontrado'})
    }
})


exports.router = router;
exports.cSchema = cSchema;
exports.crearCarritoVacio = crearCarritoVacio;