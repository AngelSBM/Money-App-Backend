const { Schema, model } = require('mongoose');


const GastoSchema = Schema({

    gasto: {
        type: String
    },

    cantidad: {
        type: Number
    }

});


module.exports = model( 'Gasto', GastoSchema );