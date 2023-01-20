// Comente todo lo de websockets que no creo estar usando
/* Envio la lista inicial de productos y mensajes a quien se conecte, el resto, se encarga el router (productosRouter con su evento newProduct) y el evento newMessage */
// io.on('connection', async (socket) => {

//     let products
//     try{
//         products = await mariadb.getAll()
//     }
//     catch (err){
//         console.log(err)
//     }

//     let msgs
//     try{
//         msgs = await msgsHelper.getAll()
//     }
//     catch (err){
//         console.log(err)
//     }
//     // console.log(msgs)
//     data = {
//         id: 1,
//         msgs: msgs
//     }

//     const authorSchema = new normalizr.schema.Entity("authors")
//     const msgSchema = new normalizr.schema.Entity("msgs") 
//     const dataSchema = new normalizr.schema.Entity("data", {
//         author: authorSchema,
//         msgs: [msgSchema]
//     })

//     const normalized = normalizr.normalize(data, dataSchema)

//     socket.emit("currentProducts", products)
//     socket.emit("currentMessages", normalized)

    /* Guardo un nuevo mensaje y actualizo a todos los usuarios */
//     socket.on("newMessage", async msg =>{
//         msg.date = "[" + moment().format('MMMM Do YYYY, h:mm:ss a') + "]"

//         try{
//             await msgsHelper.insert(msg)
//         }
//         catch (err) {
//             console.log(err)
//         }

//         let msgs
//         try{
//             msgs = await msgsHelper.getAll()
//         }
//         catch (err){
//             console.log(err)
//         }
        
//         io.sockets.emit("currentMessages", msgs)
//     })
// })