import * as dotenv from "dotenv";
dotenv.config();

const connection = {
    client: 'mysql',
    connection:
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: process.env.PORT
    }
};

export default connection;