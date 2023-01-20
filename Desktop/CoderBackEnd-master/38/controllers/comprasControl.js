// importar carritosmodel, comprasmodel, comprashelper
// vaciarcarrito, sendmail, sendtwilio, sendwhatsapp

async function comprarCarrito(req, res) {
    let reqUser = req.user.username
    let carritoQuery = await Carritos.findOne({username: reqUser}).lean()
    if (carritoQuery.count <= 0) {
        logger.error(`se intento comprar un carrito que no existe`)
    } else if (carritoQuery.items.length == 0) {
        logger.error(`${reqUser} intento comprar un carrito vacio`)
    } else {
        let nuevaCompra = {
            username: reqUser,
            dateBought: new Date(),
            itemsBought: carritoQuery.items
        }
        let boughtString = '';
        carritoQuery.items.forEach(item => {
            boughtString = boughtString + `<li><b>Item:</b> ${item.name}<br> <li><b>Price:</b> ${item.price}<br><br>`
        })
        await compras.insert(nuevaCompra)
        logger.info(`${reqUser} compro un carrito con ${carritoQuery.items.length} productos`)
        sendMail(
            null,
            `Nuevo pedido de compra por parte de ${reqUser}, ${req.user.email}`,
            boughtString,
            `${boughtString}`
        )
        sendTwilioMessage(
            `Orden de compra confirmada ${boughtString}`, req.user.phone_number
        )
        sendWhatsappMessage(
            `Orden de compra confirmada para ${reqUser} con ${boughtString}`, process.env.ADMIN_PHONE_NUMBER
        )
        vaciarCarrito(req, res, '/', true)
    }
}

async function renderBuyHistory(req, res) {
    let reqUser = req.user.username
    let data = await Compras.find({username: reqUser}).sort({dateBought: -1}).lean()
    res.render('compras', {data: data, username: reqUser})
}