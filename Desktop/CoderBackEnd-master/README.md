# Coderhouse backend, comision 32105


## 27/12/2022
#### Logs & Performance
````
> npm run logsnperf
````
Mismo CLI que la entrega anterior
## 11/12/2022
#### Proxy & Nginx
````
> npm run loadbalance <port, default: 8080>
````
* El servidor va a iniciar por default en modo standalone, con un solo nodo en el puerto especificado (u 8080 en caso de no pasarle nada/pasarle fruta)
````
> npm run loadbalance <port || default (8080)> cluster
````
* El servidor va a iniciar en modo cluster, abriendo en el puerto especificado un worker por cada nucleo de cpu disponible. Requiere que le pases **algo** como segundo argumento, si es un numero lo usa como puerto y si le pasas default/fruta/falopa hace la conversion al 8080. 
* Hacer npm run loadbalance *modo* sin especificar puerto va a salir por el primer if y arrancar en standalone, 8080.
````
> npm run loadbalance <port || default (8080)> fork
````
* El servidor va a iniciar en modo fork, spawneando un proceso de la aplicacion por cada nucleo de cpu disponible en puertos contiguos al especificado. Requiere que le pases **algo** como segundo argumento, si es un numero lo usa como puerto y si le pasas default/fruta/falopa hace la conversion al 8080. 
* Hacer npm run loadbalance *modo* sin especificar puerto va a salir por el primer if y arrancar en standalone, 8080.
  * ej: puerto 8080, tenemos 4 nucleos de cpu: se nos van a abrir 4 servidores en los puertos 8080, 8081, 8082 y 8083
## 04/12/2022
#### Process
* num run process \<port, default: 8080><br>
ó
* node ./28-Process/main.js \<port, default: 8080>
  * requiere mongoUrl="" en .env
  * rutas: GET /info, GET /api/random, GET /api/random?qty=\<Cantidad>


## 20/11/22
#### Inicio de sesion
* npm run auth
  requiere agregar en el .env un mongoUrl=""


## 17/11/22
#### Login
* rpm run login
  * requiere tener la base 'coderhouse' en mysql con la tabla productos, en caso de que no esté se puede generar con node 24-Login/db/* tal como se hizo en entregas anteriores. TODO para la proxima entrega reworkear esta porqueria para que use *SÓLO ATLAS* porque me estoy muriendo manejando tantas db desde la misma app
  * requiere cargar mongoUrl: '' dentro de mongoCreds en main.js
  * los campos no se limpian cuando cargas un producto porque el js se ejecuta antes que el POST y te arruina todo. se soluciona sacando por completo el form y haciéndolo como inputs de html comunes y corrientes que manejen todo a través del socket, pero no tuve tiempo de ajustarlo

## 09/11/22
#### Mocks y normalizacion
* npm run mocks
    * rutas: /, /api/productos-test
    * el centro de productos está medio roto (se siguen guardando en la base de datos y te los carga una vez que cargas la página, pero no se actualizan una vez que agregas uno nuevo). menos mal que no cabía dentro de esta entrega :)
    * una vez que envias un mensaje se limpia el valor del mensaje del front pero mantiene todos los demás datos, corrección recibida en la entrega de la clase #16
    * normalizr es una librería escrita por satanás y deberíamos estar agradecidos de que fue descontinuada
    * gracias maxifisz por tu ayuda

## 01/11/22
#### Segunda entrega del trabajo final
* npm run segundaentrega
    * rutas de productos:
        * GET /api/productos/
        * GET /api/productos/:id
        * POST /api/productos/ (mandando como json el objeto a insertar en el body)
        * PUT /api/productos/:id (mandando como json el objeto modificado en el body)
        * DELETE /api/productos/:id
    * rutas de carritos:
        * GET /api/carrito/
        * GET /api/carrito/:id/productos
        * POST /api/carrito/
        * DELETE /api/carrito/:id
        * POST /api/carrito/:id_carrito/productos/:id_producto
        * DELETE /api/carrito/:id_carrito/productos/:id_producto

Setear el motor de base de datos modificando el .env con:
````
dbType="mongo"
````
ó
````
dbType="firestore"
````
En el caso de firestore, se debe generar un archivo firestore-config.js dentro de 20-SegundaEntrega/helpers/firestore-config.js con el formato:
````
const firebase =  {
    "type": 
    "project_id": 
    "private_key_id": 
    "private_key": 
    "client_email":
    "client_id": 
    "auth_uri": 
    "token_uri": 
    "auth_provider_x509_cert_url": 
    "client_x509_cert_url": 
    }
module.exports = firebase;
````


## 22/10/22
### Primera base de datos
mi conexión con mysql estaba rotísima porque hace un tiempo desinstalé workbench, no se borró todo, y cuando lo instalé otra vez reventó por todos lados.\
para arreglarlo tuve que hacer:\
* ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
* FLUSH PRIVILEGES;
(obviamente se puede poner otra contraseña, pero está hardcodeada en 16-DecimoSexta-clase/db/maria*)\
Una vez arreglado eso, de haber sido necesario\
* Backend> node .\16-DecimoSexta-clase\db\mariaCreateDb.js
* Backend> node .\16-DecimoSexta-clase\db\mariaCreateTable.js
* Backend> node .\16-DecimoSexta-clase\db\sqliteCreateTable.js
y por último
* Backend > npm run wswithdb

## 07/10/22
### Primera entrega del trabajo final
* npm run primeraentrega
  * ruta de productos: /api
    * metodos: GET /api, GET /api/id, POST /api, PUT /api/id, DELETE /api/id
    * autorizacion por header, usar "isadmin":true
  * ruta de carritos: /carrito
    * metodos: POST /carrito, DELETE /carrito/id, GET /carrito/id/productos, POST /carrito/id1/productos/id2, DELETE /carrito/id1/productos/id2

## 22/09/22
### Sexto desafio, decimosegunda clase
* websockets, chat y esos yuyos
  * npm run websockets

## 14/09/2022
### Quinto desafio, decima clase
* Motores de plantillas: pug, ejs, handlebars
  * npm run pug
  * npm run ejs
  * npm run handlebars
* ¿Cuál prefiero?
  * Handlebars, es el más parecido a django de los 3 y aún si no conociera este segundo, me parece la forma más práctica de implementar variables