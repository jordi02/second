import daos from "./src/daos/index.js";


(async () => {
    const dao = await daos;
    const crudTest = await dao.read();
    console.log(await crudTest)
})();

