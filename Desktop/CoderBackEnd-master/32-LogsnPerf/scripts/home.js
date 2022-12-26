const socket = io()

let emptyTemplateProducts = $("#list-products").html()
let emptyTemplateName = $("#username").html()

let compiledProducts = Handlebars.compile(emptyTemplateProducts)
let compiledName = Handlebars.compile(emptyTemplateName)

socket.on('currentData', (data) =>{
    $(".username").html(compiledName({name: data}))
})

socket.on('currentProducts', (data) =>{
    $(".list-products").html(compiledProducts({data: data}))
})

let buttonProductos = document.querySelector(".createProductBtn")
buttonProductos.addEventListener("click", function(){
    socket.emit('newProduct');
    // let nameBox = document.getElementById('nombre');
    // let priceBox = document.getElementById('precio');
    // let thumbnailBox = document.getElementById('thumbnail');

    // nameBox.value = '';
    // priceBox.value = '';
    // thumbnailBox.value = '';

    /* todo esto esta comentado porque el js se ejecuta antes de que 
    pase por el 'POST /', entonces te rompe la request forzando que envie datos vacios.
    pasando todo a websockets se soluciona el problema pero la vida es una mierda y no
    tuve tiempo para hacerlo para esta entrega */
})

function logOut(){
    window.location = "/accounts/logout"
}
let logOutBtn = document.querySelector('.btnLogout')
logOutBtn.addEventListener('click', logOut)