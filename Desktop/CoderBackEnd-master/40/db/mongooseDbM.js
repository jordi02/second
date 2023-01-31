const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.mongoUrl);

class mongooseHelper{
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getByID(id){
        const data = await this.collection.findOne({_id: id}).lean()
        return data
    }

    // no se por que esto estaba comentado pero si funciona
    // me sirve para lo que tengo que hacer ahora asi que 
    // gracias ignacito del pasado

    async find(field, value) {
        const selector = {[field] : value}
        const data = await this.collection.findOne(selector)
        if (data != null) {
            return true
        } else {
            return false
        }
    }

    async getAll(){
        const data = await this.collection.find({})
        return data
        console.log(data)
    }

    async insert(obj) {
        const model = new this.collection(obj);
        await model.save();
        return model._id;
    }

    async update(obj, id) {
        obj.date = new Date();
        const model = await this.collection.findOne({_id: id})
        model.overwrite(obj)
        model.save();
    }

    async delete(id) {
        await this.collection.deleteOne({_id: id})
    }
}

module.exports = mongooseHelper