import React from "react";
import { useState, useEffect } from "react";

const [productos, setProductos] = useState([]);


useEffect(async () => {
const response = await fetch("http://localhost:3000/api/productos");
const data = await response.json();
setProductos(data);
}, []);



return productos.length > 0 ? <Productos>{productos}</Productos> : <h1>Cargando...</h1>;



<div>{productos.detalle.titulo1}</div>

undefined
undefined