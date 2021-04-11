
/* 

Ruta: /api/saldo

*/

const { Router } = require('express');
const router = Router();

const Ingreso = require('../models/ingreso');
const Gasto = require('../models/gasto');
const Saldo = require('../models/saldo');

router.get( '/', async(req, res) => {
 
    // const ingresoDB = await Ingreso.find();
    // if( ingresoDB.length != 0 ){
    //     ingresoDB.forEach( ingreso => saldo = saldo + ingreso.cantidad );
    // }
    

    // const gastoDB = await Gasto.find();
    // if( gastoDB.length != 0 ){
    //     gastoDB.forEach( gasto => saldo = saldo - gasto.cantidad );
    // }

    

    const saldoDB = await Saldo.findById( '6070ebb899925b1d90a5f526' );

    const { saldo } = saldoDB;

    return res.json({
        ok: true,
        msg: 'nitido saldo',
        saldo
    })

});



module.exports = router;