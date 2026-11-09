TP08 - Gestión de reservas con MongoDB y API HTTP

Descripción

Aplicación desarrollada con Node.js y Express para gestionar reservas de salas de estudio, incorporando persistencia de datos mediante MongoDB Atlas y Mongoose.

Este trabajo práctico amplía el TP07 e incorpora una API HTTP que permite consultar, filtrar, buscar y crear reservas en la base de datos.

La aplicación permite:

Consultar las reservas almacenadas en MongoDB.

Ver el detalle de una reserva.

Registrar nuevas reservas desde un formulario web.

Validar los datos enviados mediante middleware.

Identificar cada reserva mediante un ID de MongoDB.

Medir la duración de cada solicitud.

Mostrar una página 404 cuando la dirección no existe.

Comprobar la conexión con MongoDB Atlas.

Crear y consultar reservas mediante scripts independientes.

Consultar reservas mediante una API HTTP.

Filtrar reservas por sala.

Gestionar errores y respuestas HTTP.

Instalación

Clonar o descargar el repositorio y ubicarse dentro de la carpeta del proyecto:

cd tp-08-salas-http-mongodb

Instalar las dependencias:

npm install

Configuración de variables de entorno

Crear un archivo .env en la raíz del proyecto con las siguientes variables:

PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER/reservas_salas_u8

Reemplazar los datos de conexión por los correspondientes a la propia base de datos de MongoDB Atlas.

El archivo .env contiene información privada y no debe subirse al repositorio.

El archivo .env.example presenta un ejemplo de las variables necesarias sin incluir credenciales reales.

Ejecución de la aplicación

Para iniciar el servidor:

npm start

La aplicación estará disponible en:

http://localhost:3000

La conexión con MongoDB Atlas se establece antes de iniciar el servidor Express.

Comprobación de sintaxis

Para verificar la sintaxis de los archivos JavaScript:

npm run check

Análisis del código

Para ejecutar ESLint y comprobar posibles errores o advertencias:

npm run lint

Rutas de la aplicación web

Método

Ruta

Descripción

GET

/

Página de inicio

GET

/estado

Estado del servicio en formato JSON

GET

/reservas

Listado de reservas

GET

/reservas/nueva

Formulario de nueva reserva

GET

/reservas/:id

Detalle de una reserva

POST

/reservas

Crear una nueva reserva

La ruta /reservas/nueva se encuentra antes de /reservas/:id para evitar que la palabra nueva sea interpretada como un identificador.

Configuración de MongoDB

La conexión con MongoDB Atlas se realiza mediante Mongoose.

La configuración se encuentra en:

src/config/base-datos.js

La URI de conexión se obtiene desde las variables de entorno definidas en .env.

Base de datos utilizada:

reservas_salas_u8

Colección utilizada:

reservas

Modelo de reserva

El modelo se encuentra en:

src/modelos/reservas.js

Cada reserva contempla los siguientes campos:

Campo

Tipo

Validación

estudiante

String

Obligatorio y sin espacios externos

email

String

Obligatorio y debe contener @

sala

String

Sala Norte, Sala Sur o Sala Multimedia

fecha

String

Obligatoria

turno

String

Mañana, Tarde o Noche

personas

Number

Número entero entre 1 y 6

estado

String

Valor predeterminado: pendiente

Mongoose permite definir el esquema y validar los datos antes de almacenarlos.

El identificador de cada reserva se genera mediante MongoDB y se representa como una cadena de texto en las respuestas de la API.

API HTTP de reservas

La API se encuentra disponible bajo la ruta base:

/api/reservas

Endpoints disponibles

Método

Ruta

Descripción

GET

/api/reservas

Listar todas las reservas

GET

/api/reservas/:id

Consultar una reserva por ID

POST

/api/reservas

Crear una nueva reserva

Filtrar reservas por sala

La API permite filtrar las reservas mediante el parámetro de consulta sala.

Ejemplo:

GET /api/reservas?sala=Sala%20Norte

Devuelve solamente las reservas correspondientes a la Sala Norte.

Si no existen reservas para la sala indicada, devuelve una lista vacía.

Si se repite el parámetro sala, la API responde con un error 400.

Crear una reserva mediante POST

Para registrar una reserva se utiliza el método POST y se envían los datos en formato JSON.

Ejemplo:

{
  "estudiante": "María López",
  "email": "maria.lopez@example.com",
  "sala": "Sala Sur",
  "fecha": "2026-11-12",
  "turno": "Tarde",
  "personas": 3
}

Si los datos son válidos, la API devuelve:

Código HTTP 201 (Created).

La reserva creada en formato JSON.

Una cabecera Location con la dirección del recurso creado.

El campo estado se establece automáticamente mediante el valor predeterminado del modelo.

Manejo de errores HTTP

La API contempla las siguientes respuestas:

Código

Descripción

200

Consulta realizada correctamente

201

Reserva creada correctamente

400

Datos incorrectos, JSON inválido o identificador mal formado

404

Reserva inexistente

500

Error interno del servidor

Las respuestas de error se presentan en formato JSON y no exponen información sensible del servidor.

La API no implementa operaciones PUT, PATCH ni DELETE.

Scripts de persistencia

Los scripts se encuentran dentro de la carpeta scripts.

1. Comprobar conexión

node scripts/comprobar-conexion.js

Comprueba que la conexión con MongoDB Atlas se establezca correctamente.

2. Crear una reserva

node scripts/crear-reserva.js

Crea una reserva y la almacena en MongoDB.

3. Listar reservas

node scripts/listar-reservas.js

Consulta y muestra las reservas almacenadas en la colección reservas.

Persistencia de datos

En este trabajo práctico, tanto la aplicación web como la API HTTP utilizan MongoDB Atlas para almacenar y consultar las reservas.

Las reservas creadas desde el formulario web, mediante la API o mediante los scripts independientes quedan almacenadas en la base de datos.

Los datos permanecen disponibles aunque se detenga y vuelva a iniciar el servidor.

Pruebas de la API con Postman

Se prepararon solicitudes para comprobar el funcionamiento de los endpoints:

Listar reservas.

Crear una reserva.

Buscar una reserva por ID.

Filtrar reservas por sala.

Consultar una sala sin resultados.

Probar el envío repetido del filtro sala.

Probar la creación de una reserva con datos inválidos.

Probar un identificador inválido.

Las pruebas permiten verificar las respuestas HTTP y el manejo de errores de la API.

Estructura principal del proyecto

tp-08-salas-http-mongodb/
│
├── src/
│   ├── app.js
│   ├── index.js
│   │
│   ├── config/
│   │   ├── entorno.js
│   │   └── base-datos.js
│   │
│   ├── controladores/
│   │   ├── reservas.js
│   │   └── api-reservas.js
│   │
│   ├── middleware/
│   │   ├── reservas.js
│   │   ├── solicitudes.js
│   │   └── errores.js
│   │
│   ├── modelos/
│   │   └── reservas.js
│   │
│   ├── rutas/
│   │   ├── reservas.js
│   │   └── api-reservas.js
│   │
│   └── servicios/
│       └── reservas.js
│
├── scripts/
│   ├── comprobar-conexion.js
│   ├── crear-reserva.js
│   └── listar-reservas.js
│
├── views/
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

Tecnologías utilizadas

Node.js

Express

MongoDB Atlas

Mongoose

dotenv

EJS

express-ejs-layouts

Morgan

ESLint

HTML

CSS

Postman

Autor

Trabajo Práctico 08 - Gestión de reservas con MongoDB y API HTTP.