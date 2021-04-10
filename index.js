const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();


//Configurar el CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );

//Base de datos
dbConnection();


//Rutas
app.use( '/api/saldo', require('./routes/saldo') );
app.use( '/api/gasto', require('./routes/gasto') );
app.use( '/api/ingreso', require('./routes/ingreso') );




app.listen( 3100, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
} )