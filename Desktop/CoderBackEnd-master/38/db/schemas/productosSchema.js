const Schema = require('mongoose').Schema

const productSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: {type: String, required: true}
})

exports.productSchema = productSchema