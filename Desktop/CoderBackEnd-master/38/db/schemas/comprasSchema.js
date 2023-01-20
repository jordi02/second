const Schema = require('mongoose').Schema

const comprasSchema = new Schema({
    username: {type: 'string', required: true},
    dateBought: {type: 'date', required: true},
    itemsBought: {type: 'array', required: true}
})

exports.comprasSchema = comprasSchema