import mongoose from "mongoose";
import config from "../../configdb.js";


await mongoose.connect(config.Mongo.uri, config.Mongo.options);

const Users = mongoose.model("users", {
    username: String,
    password: String,
});

export default Users;