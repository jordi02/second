const express = require('express')
const router = express.Router()

router.get('/', isAuth, async (req, res)=>{
    //renderHomePage
})

router.post('/', isAuth, async (req, res)=>{
    //createNewProduct
})

router.get('/error', async (req, res) => {
    //renderErrorPage
})

router.get('/info', async (req, res) => {
    //renderinfopage
})

exports.router = router;