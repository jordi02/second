const Knex =  require("knex")

class SQLHelper{
    constructor(config, database){
        this.knex = Knex(config)
        this.database = database
    }

    async getAll(){
            console.log("estoy aca")
            const data = await this.knex.from(this.database).select("*")
            return data            
    }

    async insert(data){
        try{
            await this.knex(this.database)
            .insert(data)
        }
        catch (err){
            console.log(err)
        }
    }
}

module.exports = SQLHelper