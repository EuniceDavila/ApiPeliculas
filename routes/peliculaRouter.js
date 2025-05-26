const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const {
  obtenerPeliculas,
  obtenerPeliculaPorId,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula
} = require('../controllers/peliculaController');
const categoriasValidas = ["Romance", "Acción", "Terror", "Comedia", "Ciencia Ficción"];

/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Operaciones relacionadas con las películas
 */

/**
 * @swagger
 * /peliculas:
 *   get:
 *     tags: [Películas]
 *     summary: Obtener todas las películas
 *     description: Devuelve una lista de todas las películas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de películas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   titulo:
 *                     type: string
 *                     example: "Inception"
 *                   autor:
 *                     type: string
 *                     example: "Christopher Nolan"
 *                   anio_estreno:
 *                     type: integer
 *                     example: 2010
 *                   categoria:
 *                     type: string
 *                     example: "Ciencia Ficción"
 *       500:
 *         description: Error en el servidor
 */
router.get('/', obtenerPeliculas);

/**
 * @swagger
 * /peliculas/{id}:
 *   get:
 *     tags: [Películas]
 *     summary: Obtener una película por ID
 *     description: Devuelve los detalles de una película especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de la película
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 titulo:
 *                   type: string
 *                   example: "Inception"
 *                 autor:
 *                   type: string
 *                   example: "Christopher Nolan"
 *                 anio_estreno:
 *                   type: integer
 *                   example: 2010
 *                 categoria:
 *                   type: string
 *                   example: "Ciencia Ficción"
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', [param('id').isInt().withMessage('El ID debe ser un número entero.')], obtenerPeliculaPorId);
/**
 * @swagger
 * /peliculas:
 *   post:
 *     tags: [Películas]
 *     summary: Crear una nueva película
 *     description: Crea una nueva película en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Inception"  
 *               autor:
 *                 type: string
 *                 example: "Christopher Nolan" 
 *               anio_estreno:
 *                 type: integer
 *                 example: 2010  
 *               categoria:
 *                 type: string
 *                 example: "Ciencia Ficción"  
 *     responses:
 *       201:
 *         description: Película creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error en el servidor
 */
router.post(
  '/',
  [
    body('titulo').isString().notEmpty().withMessage('El título es obligatorio y debe ser una cadena.'),
    body('autor').isString().notEmpty().withMessage('El autor es obligatorio y debe ser una cadena.'),
    body('anio_estreno')
      .isInt({ min: 1850 }).withMessage('El año de estreno debe ser un número mayor o igual a 1850.'),
    body('categoria')
      .isIn(categoriasValidas).withMessage(`La categoría debe ser una de las siguientes: ${categoriasValidas.join(', ')}.`)
  ],
  crearPelicula
);

/**
 * @swagger
 * /peliculas/{id}:
 *   patch:
 *     tags: [Películas]
 *     summary: Actualizar una película existente
 *     description: Actualiza los detalles de una película especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Inception"  
 *               autor:
 *                 type: string
 *                 example: "Christopher Nolan" 
 *               anio_estreno:
 *                 type: integer
 *                 example: 2010  
 *               categoria:
 *                 type: string
 *                 example: "Ciencia Ficción"  
 *     responses:
 *       200:
 *         description: Película actualizada
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.patch(
  '/:id',
  [
    param('id').isInt(),
    body('titulo').optional().isString().notEmpty(),
    body('autor').optional().isString().notEmpty(),
    body('anio_estreno').optional().isInt({ min: 1888 }),
    body('categoria').optional().isIn(categoriasValidas)
  ],
  actualizarPelicula
);

/**
 * @swagger
 * /peliculas/{id}:
 *   delete:
 *     tags: [Películas]
 *     summary: Eliminar una película
 *     description: Elimina una película especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Película eliminada
 *       404:
 *         description: Película no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', [param('id').isInt().withMessage('El ID debe ser un número entero.')], eliminarPelicula);

module.exports = router;
