import daoMongo from './src/daos/usuarios/daoMongo.js';
const daoUsuarios = new daoMongo();


const user = await daoUsuarios.findUserByName("admin1");


console.log(user)