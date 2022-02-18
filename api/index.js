const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// importo las rutas
const routerUsuario = require('./routes/usuarios');
const routerAuth = require('./routes/auth');
const routerProyecto = require('./routes/proyectos');
const routerTarea = require('./routes/tareas');

const app = express();

//se conecta a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}))

app.use('/api/usuarios', routerUsuario);
app.use('/api/auth', routerAuth);
app.use('/api/proyectos', routerProyecto);
app.use('/api/tareas', routerTarea);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});