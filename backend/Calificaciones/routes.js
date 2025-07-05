// Rutas para Calificaciones
const express = require('express');
const router = express.Router();
const calificacionesController = require('./controller');

router.get('/', calificacionesController.getAllCalificaciones);

module.exports = router;
