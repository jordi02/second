const express = require('express')
const router = express.Router()

const renderHomePage = require('../controllers/homeControl').renderHomePage
const createNewProduct = require('../controllers/homeControl').createNewProduct
const renderErrorPage = require('../controllers/homeControl').renderErrorPage
const renderInfoPage = require('../controllers/homeControl').renderInfoPage
const isAuth = require('../controllers/authControl').isAuth

router.get('/', isAuth, async (req, res)=>{
    renderHomePage(req, res)
})

router.post('/', isAuth, async (req, res)=>{
    createNewProduct(req, res)
})

router.get('/error', async (req, res) => {
    renderErrorPage(req, res)
})

router.get('/info', async (req, res) => {
    renderInfoPage(req, res)
})

exports.router = router;