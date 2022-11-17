import knex from "knex";

class DBContainer {
    constructor(config, tabla) {
        this.knex = knex(config);
        this.table = tabla;
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select("*");
        } catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            return await this.knex.from(this.table).select("*").where("id", id);
        } catch (err) {
            console.log(err);
        }
    }

    async add(data) {
        try {
            return await this.knex.insert(data).into(this.table);
        } catch (err) {
            console.log(err);
        }
    }

    async update(id, data) {
        try {
            return await this.knex(this.table).where("id", id).update(data);
        } catch (err) {
            console.log(err);
        }
    }

    async delete(id) {
        try {
            return await this.knex(this.table).where("id", id).del();
        } catch (err) {
            console.log(err);
        }
    }

    async close() {
        try {
            await this.knex.destroy();
        } catch (err) {
            console.log(err);
        }
    }
}

export default DBContainer;