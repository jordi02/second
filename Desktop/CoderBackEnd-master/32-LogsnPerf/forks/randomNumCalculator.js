const process = require('process')

const end = 1000;
const start = 0;
const defAmount = 1000000;

function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}

function getNums(start, end, amount) {
    let nums = [];
    for (let i = 0; i < amount; i++) {
        generated = between(start, end)
        nums.push(generated)
    }
    return nums
}

// asi de feo como se ve este doble loop,
// iterar sobre los indices de un array es 40% mas rapido
// que ir buscando claves dentro de un diccionario.
// en tu cara maximiliano

function getQtyties(arr) {
    let results = [];
    arr.forEach((x) => {
        let idx = results.findIndex(obj => obj.num === x);
        if (idx != -1) {
            results[idx].count++;
        } else {
            results.push( {
                "num": x,
                "count": 1
            } )
            
        }
    })
    return results
}

// process.on('message', (msg) => {console.log(msg)});

let amount;
process.on('message', (msg) => {
    msgParams = msg.split(' ')
    if (msgParams[0] == 'Qty:') {
        amount = Number(msgParams[1])
        process.send(`Message: Received amount ${amount}, hold on while I do my thing`)
        let nums = getNums(start, end, amount)
        let results = getQtyties(nums)
        process.send(results)
    }
    else if (msgParams[0] == 'Default') {
        amount = defAmount;
        process.send(`Message: Using default amount ${amount}, hold on while I do my thing`)
        let nums = getNums(start, end, amount)
        let results = getQtyties(nums)
        process.send(results)
    }
    else {
        process.send(`Message: Received params ${msgParams} but I have no idea what to do with them`)
        process.send(`Message: Falling back to default amount ${amount}, hold on while I do my thing`)
        amount = defAmount;
        let nums = getNums(start, end, amount)
        let results = getQtyties(nums)
        process.send(results)
    }
    process.exit(0)
});