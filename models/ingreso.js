const { Schema, model } = require('mongoose');


const IngresoSchema = Schema({

    ingreso: {
        type: String
    },

    cantidad: {
        type: Number
    }

});


module.exports = model( 'Ingreso', IngresoSchema );