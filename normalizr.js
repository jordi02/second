import DBContainer from './dbConnection/contenedor.js';
import sqliteConfig from './dbConnection/SQLite3.js';
sqliteConfig.connection.filename = "./DB/ecommerce.sqlite"
const DBMensajes = new DBContainer(sqliteConfig, 'messages');
import { denormalize, normalize, schema } from 'normalizr';
import util from 'util';

// function update30id() {
//     for (let i = 130; i < 143; i++) {
//         DBMensajes.delete(i);
//     }
//     return "Listo";
// }
// update30id();

const Normalizr = async () => {
    const DB = await DBMensajes.getAll();
    const parseDB = DB.map((item) => {
        return {
            author: {
                id: item.email,
                name: item.name,
                apellido: item.apellido,
                alias: item.alias,
                avatar: item.avatar,
                edad: item.edad
            },
            msg: {
                id: item.id,
                msg: item.msg
            },
            id: item.id,
        }

    })

    // const idParsedb = {
    //     id: "mensajes",
    //     mensajes: parseDB
    // }

    // const schemaConId = new schema.Entity('mensajes',
    //     {
    //         mensajes: schemaCompleto
    //     }
    // );

    const authorSchema = new schema.Entity('author', parseDB.author);
    const msgSchema = new schema.Entity('msg', parseDB.msg);

    const schemaCompleto = new schema.Entity('Chat',
        {
            author: authorSchema,
            msg: msgSchema,
        }
    );





    const DataCompleta = JSON.stringify(DB).length
    const normalizedData = normalize(parseDB, [schemaCompleto]);
    const Datanormalizada = JSON.stringify(normalizedData).length

    //Porcentaje
    const porcentajeMenos = (DataCompleta - Datanormalizada) / DataCompleta * 100
    const PorcentajeData = (`La data normalizada ocupa un ${porcentajeMenos}% menos de la data original`);

    // const DenormalizedData = denormalize(normalizedData.result, [schemaCompleto], normalizedData.entities);
    //console.log(util.inspect(normalizedData, false, null, true /* enable colors */));
    // console.log("Separacion de datos");
    //console.log(util.inspect(DenormalizedData, false, 5));
    //console.log(parseDB)

    return { normalizedData, PorcentajeData };
}

export default Normalizr;