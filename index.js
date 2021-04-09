const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();


//Configurar el CORS
app.use( cors() );

//Base de datos
dbConnection();


//tWHAaN16EhrdWY7n
//appmoney_user 


//Rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'nitido'
    })

});




app.listen( 3100, () => {
    console.log('Servidor corriendo en puerto' + process.env.PORT );
} )