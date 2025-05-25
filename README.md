# API REST de Películas

Esta API permite gestionar un catálogo de películas con operaciones CRUD: crear, leer, actualizar y eliminar películas.

---

## Tecnologías Utilizadas

- Node.js
- Express.js
- express-validator
- Jest
- Supertest
- Swagger

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

## Instalación y Ejecución

### 1. Clona el repositorio
git clone https://github.com/EuniceDavila/ApiPeliculas.git  
cd ApiPeliculas

### 2. Instala dependencias
npm install

### 3. Configura el archivo .env
PORT=3000  
DB_HOST=localhost  
DB_USER=tu_usuario  
DB_PASSWORD=tu_contraseña  
DB_NAME=nombre_base_datos

### 4. Ejecuta el servidor
node index.js

## Endpoints Principales
### Obtener todas las películas
GET http://localhost:3000/peliculas

### Obtener película por ID
GET http://localhost:3000/peliculas/:id

### Crear una nueva película
POST http://localhost:3000/peliculas

### Actualizar película por ID
PATCH http://localhost:3000/peliculas/:id

### Eliminar película
DELETE http://localhost:3000/peliculas/:id

## Validaciones
### titulo: obligatorio, texto.

### autor: obligatorio, texto.

### anio_estreno: obligatorio, entero ≥ 1850.

### categoria: debe ser una de:

#### 1. Romance

#### 2. Acción

#### 3. Terror

#### 4. Comedia

#### 5. Ciencia Ficción

## Documentación con Swagger
Disponible en:
http://localhost:3000/api-docs  
Configurada en docs/swaggerOptions.js.

## Pruebas
Ejecuta las pruebas con:

npx jest
Las pruebas están en Test/test.js y usan Jest + Supertest.

## Autor
Eunice Dávila  
Clase: DESARROLLO API REST