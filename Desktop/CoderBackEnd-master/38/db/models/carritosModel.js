const Model = require('mongoose').model;
const Helper = require('../../helpers/mongooseHelper')
const carritosSchema = require('../schemas/carritosSchema').carritoSchema

const carritosModel = new Model('carritos', carritosSchema)
const carritosHelper = new Helper('carritos', carritosSchema)

exports.carritosModel = carritosModel
exports.carritosHelper = carritosHelper