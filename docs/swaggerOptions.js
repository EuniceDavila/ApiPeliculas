const path = require('path');

module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Películas',
      version: '1.0.0',
      description: 'CRUD de películas populares'
    },
    servers: [{ url: 'http://localhost:3000' }],
    tags: [
      {
        name: 'Películas',
        description: 'Operaciones relacionadas con las películas'
      }
    ]
  },
  apis: [path.join(__dirname, '../routes/*.js')]
};
