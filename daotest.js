import daoMongo from './src/daos/usuarios/daoMongo.js';
const daoUsuarios = new daoMongo();


const user = await daoUsuarios.findUser("clau", "123")


console.log(user)