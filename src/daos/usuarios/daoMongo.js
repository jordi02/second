import CRUDMongo from "../../../src/containers/contenedorMongo.js";

class daoMongo extends CRUDMongo {
    constructor() {
        super("usuarios", { username: String, password: String });
    }

    async findUserByName(username) {
        const user = await this.db.find({ username });
        return user;
    }

    async findUser(username, password) {
        try {
            const result = await this.db.find({ username, password });
            if (result.length == 0) {
                throw new Error("Usuario o contraseña incorrectos");
            } else {
                const user = result[0];
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default daoMongo;