// Rutas para Tareas
const express = require('express');
const router = express.Router();
const tareasController = require('./controller');

// Ejemplo de ruta
router.get('/', tareasController.getAllTareas);

module.exports = router;
