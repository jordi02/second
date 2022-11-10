import mongoose from "mongoose";
import config from "../../configdb.js";

await mongoose.connect(config.Mongo.uri, config.Mongo.options);

class CRUDMongo {
    constructor(coleccion, schema) {
        this.db = mongoose.model(coleccion, schema);
    }

    async create(data) {
        try {
            const result = await this.db.insertMany(data);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async read() {
        try {
            const result = await this.db.find({});
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async readById(id) {
        try {
            const result = await this.db.findOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, data) {
        try {
            const result = await this.db.updateOne({ _id: id }, { $set: data });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const result = await this.db.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
        }
    }
}

export default CRUDMongo;