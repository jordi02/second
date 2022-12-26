const express = require('express')
const router = express.Router()
const MongoHelper = require('../helpers/mongooseHelper')

const logger = require('../app/logger');


/* let carritos = new MongoHelper()
let productos = new MongoHelper() */


router.get('/', async (req, res)=>{
    let currentData
    try{
        currentData = await carritos.getAll()
    }
    catch (err){
        logger.error(err)
    }

    if(currentData){
        res.send(currentData)
    }
    else{
        res.send({error: 'No hay carritos'})
    }

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

router.post('/', async (req, res)=>{
    let carrito = {
        productos: []
    }
    
    try {
        await carritos.insert(carrito)
    }
    catch (err){
        logger.error(err)
        res.send(err)
    }
    res.send(`Se guardo el carrito.`)
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


module.exports = router