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




