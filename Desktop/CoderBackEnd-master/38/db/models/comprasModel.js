const Model = require('mongoose').model;
const Helper = require('../../helpers/mongooseHelper')
const comprasSchema = require('../schemas/comprasSchema').comprasSchema

const comprasModel = new Model('compras', comprasSchema)
const comprasHelper = new Helper('compras', comprasSchema)

exports.comprasModel = comprasModel;
exports.comprasHelper = comprasHelper;