const { validationResult } = require('express-validator');
const db = require('../models/conexion');

const categoriasValidas = ["Romance", "Acción", "Terror", "Comedia", "Ciencia Ficción"];

// Obtener todas las películas
exports.obtenerPeliculas = (req, res) => {
  db.query('SELECT * FROM peliculas', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener una película por ID
exports.obtenerPeliculaPorId = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM peliculas WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Película no encontrada' });
    res.json(results[0]);
  });
};

// Crear una nueva película
exports.crearPelicula = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { titulo, autor, anio_estreno, categoria } = req.body;

  const nuevaPelicula = { titulo, autor, anio_estreno, categoria };
  db.query('INSERT INTO peliculas SET ?', nuevaPelicula, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ mensaje: 'Película creada exitosamente', id: result.insertId });
  });
};

// Actualizar una película
exports.actualizarPelicula = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { titulo, autor, anio_estreno, categoria } = req.body;
  const datosActualizados = {};
  if (titulo) datosActualizados.titulo = titulo;
  if (autor) datosActualizados.autor = autor;
  if (anio_estreno) datosActualizados.anio_estreno = anio_estreno;
  if (categoria) datosActualizados.categoria = categoria;

  if (Object.keys(datosActualizados).length === 0) {
    return res.status(400).json({ error: 'No se proporcionaron datos para actualizar' });
  }

  db.query('UPDATE peliculas SET ? WHERE id = ?', [datosActualizados, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ mensaje: 'Película actualizada correctamente' });
  });
};


// Eliminar una película
exports.eliminarPelicula = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM peliculas WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Película no encontrada' });
    res.json({ mensaje: 'Película eliminada correctamente' });
  });
};
