
import fs from "fs";

class CRUDArchivo {

    constructor() {
        this.archivo = "./db.json";
    }

    read() {
        return fs.readFileSync(this.archivo, "utf8");
    }

    create(contenido) {
        fs.writeFileSync(this.archivo, contenido);

    }

    readById(id) {
        const contenido = this.read();
        const data = JSON.parse(contenido);
        return data.find((item) => item.id === id);
    }

    update(id, data) {
        const contenido = this.read();
        const data = JSON.parse(contenido);
        const index = data.findIndex((item) => item.id === id);
        data[index] = data;
        this.create(JSON.stringify(data));
    }

    delete(id) {
        const contenido = this.read();
        const data = JSON.parse(contenido);
        const index = data.findIndex((item) => item.id === id);
        data.splice(index, 1);
        this.create(JSON.stringify(data));
    }

}

export default CRUDArchivo;