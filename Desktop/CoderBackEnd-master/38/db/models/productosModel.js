const Model = require('mongoose').model;
const Helper = require('../../helpers/mongooseHelper')
const productSchema = require('../schemas/productosSchema').productSchema;

const productosModel = new Model('productos', productSchema);
const productosHelper = new Helper('productos', productSchema);

exports.productosModel = productosModel;
exports.productosHelper = productosHelper;