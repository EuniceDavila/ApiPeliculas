const request = require('supertest');
const app = require('../index'); 

describe('API de Películas', () => {
  let createdMovieId;

  // Prueba para obtener todas las películas
  test('GET /peliculas - debe devolver todas las películas', async () => {
    const res = await request(app).get('/peliculas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Prueba para crear una nueva película
  test('POST /peliculas - debe crear una nueva película', async () => {
    const newMovie = {
      titulo: "Prueba de Película",
      autor: "Eunice Davila",
      anio_estreno: 2023,
      categoria: "Romance"
    };

    const res = await request(app)
      .post('/peliculas')
      .send(newMovie);
      
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');  
    createdMovieId = res.body.id;
  });

  // Prueba para obtener película por ID
  test('GET /peliculas/:id - debe devolver una película por id', async () => {
    if (!createdMovieId) return; // Si no se creó la película, no ejecutar

    const res = await request(app).get(`/peliculas/${createdMovieId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('titulo', 'Prueba de Película');
  });
  

});
