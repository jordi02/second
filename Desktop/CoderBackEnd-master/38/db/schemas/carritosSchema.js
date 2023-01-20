const Schema = require('mongoose').Schema

const carritoSchema = new Schema({ 
    username: {type: String, required: true},
    items: {type: Array, required: true}
})

exports.carritoSchema = carritoSchema