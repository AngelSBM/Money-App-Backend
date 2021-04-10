const { Schema, model } = require('mongoose');


const SaldoSchema = Schema({

    saldo: {
        type: Number,
        default: 0
    }

});


module.exports = model( 'Saldo', SaldoSchema );