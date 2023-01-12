const express = require('express')
const router = express.Router()
const { faker } = require('@faker-js/faker');

router.get('/', async (req, res)=>{
    products = []
    for(let i = 0; i < 5; i++){
        product = {
            title: faker.commerce.product(),
            price: faker.commerce.price()
        }
        products.push(product)
    }
    res.render('productos-test', {
        data: products
    })
})

module.exports = router