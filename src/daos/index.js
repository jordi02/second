import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.TIPO_DB)

const daos = {
    Mongo: async () => {
        const { default: daoMongoProd } = await import("./productos/daoMongo.js");
        const { default: daoMongoCart } = await import("./carrito/daoMongo.js");
        return {
            productos: new daoMongoProd(),
            carrito: new daoMongoCart(),
        };
    },
    Firebase: async () => {
        const { default: daoFirebaseProd } = await import("./productos/daoFirebase.js");
        const { default: daoFirebaseCart } = await import("./carrito/daoFirebase.js");
        return {
            productos: new daoFirebaseProd(),
            carrito: new daoFirebaseCart(),
        };
    }
};


export default daos[process.env.TIPO_DB]();

