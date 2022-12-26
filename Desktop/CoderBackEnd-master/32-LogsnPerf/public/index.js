const socket = io();

const authorSchema = new normalizr.schema.Entity('authors');
const msgSchema = new normalizr.schema.Entity('msgs');
const dataSchema = new normalizr.schema.Entity('data', {author: authorSchema, msgs: [msgSchema]});

let emptyProductsTemplate = $('#lista-productos').html();
let emptyMessagesTemplate = $('#lista-mensajes').html();

let compiledProducts = Handlebars.compile(emptyProductsTemplate);
let compiledMessages = Handlebars.compile(emptyMessagesTemplate);

socket.on('currentProducts', (data) => {
    $('.lista-productos').html(compiledProducts({data: data}));
});

socket.on('currentMessages', (msgs) => {
    let data = normalizr.denormalize(msgs.result, dataSchema, msgs.entities);
    let compressTxt = document.querySelector('.compress');
    let compressLvl = (100 - (JSON.stringify(data).length * 100) / JSON.stringify(msgs).length).toPrecision(3);
    compressTxt.innerText = `Chat comprimido ${compressLvl}%`;
    $('.lista-mensajes').html(compiledMessages({msgs: data.msgs}))
    console.log(msgs)
});

let productsButton = document.querySelector('.submitProducto')
productsButton.addEventListener('click', () => {
    socket.emit('newProduct');
});

let messagesButton = document.querySelector('.submitMensaje');
messagesButton.addEventListener("click", () => {
    let emailValue = document.getElementById("email").value
    let nameValue = document.getElementById("name").value
    let lastNameValue = document.getElementById("lastname").value
    let ageValue = document.getElementById("age").value
    let usernameValue = document.getElementById("username").value
    let avatarValue = document.getElementById("avatar").value
    let msgValue = document.getElementById("msg").value

    if (![emailValue, nameValue, lastNameValue, ageValue, usernameValue, avatarValue, msgValue].every(Boolean)) {
        alert('Faltan datos');
    } else {
        let msg = {
            text: msgValue,
            author: {
                id: emailValue,
                name: nameValue,
                lastname: lastNameValue,
                age: ageValue,
                username: usernameValue,
                avatar: avatarValue
            }
        }
        socket.emit('newMessage', msg);
        let messageBox = document.getElementById("msg")
        messageBox.value = '';
    }
});