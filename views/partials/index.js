function render(data) {
  const html = data.map(elem => `<div>
    <span style="font-weight: bold;">${elem.author.id}</span>
    <p>${elem.msg.msg}</p>
    </div>`).join(' ');
  document.getElementById('mensajes-chat').innerHTML = html;

}


function renderProductos(data) {
  const html = data.map(elem => `
  <tr>
  <th >${elem.id}</th>
  <td>${elem.title}</td>
  <td>$${elem.price}</td>
  <td><img rel="icon" src="${elem.thumbnail}" style="width: 30px; height: 30px;" /></td>
  </tr>`).join(' ');
  document.getElementById('lista-productos').innerHTML = html;
}


const socket = io.connect()
socket.on('new-message', (data) => {
  const authorSchema = new normalizr.schema.Entity('author');
  const msgSchema = new normalizr.schema.Entity('msg');
  const schemaCompleto = new normalizr.schema.Entity('Chat',
    {
      author: authorSchema,
      msg: msgSchema,
    }
  );
  const DataDenormalizada = normalizr.denormalize(data.normalizedData.result, [schemaCompleto], data.normalizedData.entities)
  const html = data.PorcentajeData
  document.getElementById('data-normalizada').innerHTML = html;
  render(DataDenormalizada)
  //console.log(DataDenormalizada)
})

//front
// socket.on('data-normalizada', (data) => {
//   const authorSchema = new normalizr.schema.Entity('author');
//   const msgSchema = new normalizr.schema.Entity('msg');
//   const schemaCompleto = new normalizr.schema.Entity('Chat',
//     {
//       author: authorSchema,
//       msg: msgSchema,
//     }
//   );

//   const dataStringifiada = JSON.stringify(normalizr.denormalize(data.normalizedData.result, [schemaCompleto], data.normalizedData.entities));
//   console.log(dataStringifiada);
//   const html = data.PorcentajeData
//   document.getElementById('data-normalizada').innerHTML = html;
// })
socket.on('new-product', (data) => { renderProductos(data) })


function chatFunc(event) {
  const fecha = new Date().toLocaleDateString() + ' ' + new Date().toTimeString()
  const fyh = fecha.split(' ');
  let mensaje = {
    email: document.getElementById('email').value,
    msg: document.getElementById('chatMsg').value,
    date: fyh[0] + ' ' + fyh[1]
  }
  socket.emit('new-message', mensaje);
  document.getElementById('chatMsg').value = '';
  return false;
}

function prodFunc(event) {
  const producto = {
    title: document.getElementById('InputFName').value,
    price: document.getElementById('precio').value,
    thumbnail: document.getElementById('InputPic').value
  }
  socket.emit('new-product', producto);
  document.getElementById('InputFName').value = '';
  document.getElementById('precio').value = '';
  document.getElementById('InputPic').value = '';
  return false;
}
