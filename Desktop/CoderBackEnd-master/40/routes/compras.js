const express = require('express')
const router = express.Router()

const comprarCarrito = require('../controllers/comprasControl').comprarCarrito
const renderBuyHistory = require('../controllers/comprasControl').renderBuyHistory
const renderSuccessPage = require('../controllers/comprasControl').renderSuccessPage;
const isAuth = require('../controllers/authControl').isAuth

// esto va a haber que pasarlo a POST una vez que empecemos a manejar info de pago
router.get('/nuevacompra', isAuth, async (req, res) => {
    comprarCarrito(req, res)
})

router.get('/success', isAuth, async (req, res) => {
    renderSuccessPage(req, res)
})

router.get('/', isAuth, async (req, res) => {
    renderBuyHistory(req, res)
 })

exports.router = router;