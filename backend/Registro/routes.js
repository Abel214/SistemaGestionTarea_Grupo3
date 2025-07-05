// Rutas para Registro
const express = require('express');
const router = express.Router();
const registroController = require('./controller');

router.get('/', registroController.getAllRegistros);

module.exports = router;
