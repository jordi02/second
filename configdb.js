const config = {
    Mongo: {
        uri: "mongodb://localhost:27017/ecommerce",
        options: {
            serverSelectionTimeoutMS: 500000,
            useNewUrlParser: true,
        }
    }
}

export default config;




// const asd = "mongodb+srv://root:ClauMon123@cluster0.un0rzna.mongodb.net/?retryWrites=true&w=majority"