class CRUDMemoria {
    constructor() {
        this.memoria = [];
    }

    create(memoria) {
        this.memoria.push(memoria);
    }

    read() {
        return this.memoria;
    }

    readById(id) {
        return this.memoria.find(memoria => memoria.id === id);
    }

    update(id, memoria) {
        const index = this.memorias.findIndex(memoria => memoria.id === id);
        this.memoria[index] = memoria;
    }

    delete(id) {
        const index = this.memoria.findIndex(memoria => memoria.id === id);
        this.memorias.splice(index, 1);
    }
}