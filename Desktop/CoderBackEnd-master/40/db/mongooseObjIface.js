/* todo esto es al recontra pedo porque mis *Model.js ya exportan una unica
instancia de cada helper/model y no se vuelve a hacer un new EstoyHartoDeEsteCurso
jamas en toda la app pero bueno las filminas dicen que haga un factory te hago un factory
solo que vende mercaderia traida de China (./models) y la ensambla  en Fierra del Tuego
(DbObjectInterface) */

const accountsModel = require('./models/accountsModel').accountsModel;
const accountsHelper = require('./models/accountsModel').accountsHelper;

const carritosModel = require('./models/carritosModel').carritosModel;
const carritosHelper = require('./models/carritosModel').carritosHelper;

const comprasModel = require('./models/comprasModel').comprasModel;
const comprasHelper = require('./models/comprasModel').comprasHelper;

const productosModel = require('./models/productosModel').productosModel;
const productosHelper = require('./models/productosModel').productosHelper;


class DbObjectInterface {
    static getAccountsModel() {
        return accountsModel
    }
    static getAccountsHelper() {
        return accountsHelper
    }
    static getCarritosModel() {
        return carritosModel
    }
    static getCarritosHelper() {
        return carritosHelper
    }
    static getComprasModel() {
        return comprasModel
    }
    static getComprasHelper() {
        return comprasHelper
    }
    static getProductosModel() {
        return productosModel
    }
    static getProductosHelper() {
        return productosHelper
    }
}

module.exports = DbObjectInterface;