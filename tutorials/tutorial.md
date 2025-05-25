# Tutorial de Uso de la API REST de Películas

Este tutorial te guiará paso a paso para instalar, ejecutar y probar la API REST para la gestión de películas utilizando Node.js, Express y Jest para pruebas.

---

## Estructura del Proyecto

ApiPeliculas/  
├── controllers/  
│ └── PeliculaController.js  
├── docs/  
│ └── swaggerOptions.js  
├── middlewares/  
│ └── validarCampos.js  
├── models/  
│ └── conexion.js  
├── routes/  
│ └── peliculaRouter.js  
├── Test/  
│ └── test.js  
├── tutorials/  
│ └── tutorial.md  
├── .env  
├── .gitignore  
├── index.js  
├── package.json  
└── Readme.md  

---

##  Instalación y Configuración

### 1. Clona el repositorio

git clone https://github.com/EuniceDavila/ApiPeliculas.git  
cd ApiPeliculas  
### 2. Instala dependencias  
npm install  
### 3. Crea el archivo .env  
PORT=3000  
DB_HOST=localhost  
DB_USER=tu_usuario  
DB_PASSWORD=tu_contraseña  
DB_NAME=nombre_base_datos  
## Iniciar el servidor  
node index.js

### Abre en el navegador:
http://localhost:3000


## Endpoints Disponibles

### Obtener todas las películas
GET /peliculas
### Obtener película por ID
GET /peliculas/:id
### Crear nueva película
POST /peliculas  
Content-Type: application/json  
{  
  "titulo": "Ejemplo",  
  "autor": "Autor Ejemplo",  
  "anio_estreno": 2022,  
  "categoria": "Comedia"  
}  
## Actualizar película
PATCH /peliculas/:id
## Eliminar película
DELETE /peliculas/:id

## Validaciones
titulo: obligatorio, tipo texto.

autor: obligatorio, tipo texto.

anio_estreno: obligatorio, entero ≥ 1850.

categoria: debe ser una de:

"Romance"  
"Acción"  
"Terror"  
"Comedia"  
"Ciencia Ficción"  

## Swagger - Documentación Interactiva
URL:

http://localhost:3000/api-docs  
Configurada en: docs/swaggerOptions.js.  

## Pruebas con Jest y Supertest
### 1. Exportar la app en index.js para pruebas
const express = require('express');  
const app = express();  
// ... resto de configuración ...  
module.exports = app;  
Separar el listen:  

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => {  
  console.log(`Servidor corriendo en el puerto ${PORT}`);  
});  
### 2. Ejecutar las pruebas
npx jest  

El archivo de pruebas es Test/test.js e incluye:

GET /peliculas  
POST /peliculas  
GET /peliculas/:id

## Autor
Eunice Dávila  
Materia: Desarrollo API REST
---