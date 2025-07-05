// Archivo principal de Express.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());


// Importar y usar rutas de Tareas
const tareasRoutes = require('./Tareas/routes');
app.use('/tareas', tareasRoutes);

// Importar y usar rutas de Calificaciones
const calificacionesRoutes = require('./Calificaciones/routes');
app.use('/calificaciones', calificacionesRoutes);

// Importar y usar rutas de Registro
const registroRoutes = require('./Registro/routes');
app.use('/registro', registroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
