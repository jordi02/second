const express = require('express')
const router = express.Router()

// esto va a haber que pasarlo a POST una vez que empecemos a manejar info de pago
router.get('/nuevacompra', isAuth, async (req, res) => {
    comprarCarrito(req, res)
})

router.get('/', isAuth, async (req, res) => {
    //renderbuyhistory
 })

exports.router = router;