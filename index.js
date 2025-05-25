const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const xmlparser = require('express-xml-bodyparser');
const swaggerJsdoc = require('swagger-jsdoc');
//const redoc = require('redoc-express');
const swaggerOptions = require('./docs/swaggerOptions');
const swaggerSpec = swaggerJsdoc(swaggerOptions);
const swaggerUi = require('swagger-ui-express');

const peliculaRouter = require('./routes/peliculaRouter');

app.use(express.json());
app.use(xmlparser());
app.use('/peliculas', peliculaRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/api-docs-json', (req, res) => {
  res.json(swaggerSpec);
});

app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;