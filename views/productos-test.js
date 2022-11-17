const socket = io.connect()

function renderProductos(data) {
    const html = data.map(elem => `
    <tr>
    <td>${elem.title}</td>
    <td>${elem.price}</td>
    <td><img rel="icon" src="${elem.thumbnail}" style="width: 30px; height: 30px;" /></td>
    </tr>`).join(' ');
    document.getElementById('lista-productos').innerHTML = html;
}

socket.on('randomProducts', (data) => { renderProductos(data) })

