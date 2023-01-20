const express = require('express')
const router = express.Router()


//carritoshelper, carritosmodel, productoshelper, productosmodel, isauth

router.get('/micarrito/vaciar', isAuth, async (req, res) => {
    vaciarCarrito(req, res, '/', false)
})

router.get('/del/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    borrarProductoDeCarrito(req, res, idprod, '/carritos/micarrito')
})

router.get('/add/:idProducto', isAuth, async (req, res) => {
    idprod = req.params.idProducto
    agregarProductoACarrito(req, res, idprod, '/')
})

router.get('/micarrito', isAuth, async(req, res)=>{
    let reqUser = req.user.username
    let data = await Carritos.findOne({username: reqUser}).lean()
    res.render('carrito', {data: data, username: reqUser})
})


exports.router = router;