const Schema = require('mongoose').Schema

const accountsSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    age: {type: Number, required: true},
    phone_number: {type: String, required: true},
    photo_url: {type: String, required: false}
})

exports.accountsSchema = accountsSchema