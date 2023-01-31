const Model = require('mongoose').model;
const Helper = require('../mongooseDbM')
const accountsSchema = require('../schemas/accountsSchema').accountsSchema

const accountsModel = new Model('users', accountsSchema)
const accountsHelper = new Helper('users', accountsSchema)

exports.accountsModel = accountsModel
exports.accountsHelper = accountsHelper