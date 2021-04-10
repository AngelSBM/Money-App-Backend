/* 

    Ruta: /api/ingreso

*/
const { Router } = require('express');
const Ingreso = require('../models/ingreso')
const Saldo = require('../models/saldo');

const router = Router();



router.get( '/', async (req, res) => {    


    const ingresoDB = await Ingreso.find();
    if( ingresoDB.length === 0 ){
        return res.json({
            ok: false,
            msg: 'No hay ingresos registrados'
        });
    }


    try {

        return res.json({
            ok: true,
            ingresos: ingresoDB 
        })

    } catch (error) {
        
    }

});


router.post( '/', async (req, res) => {    

    const ingresoDB = new Ingreso( req.body );
    const saldoDB = await Saldo.findById('6070ebb899925b1d90a5f526');

    try {
        
        await ingresoDB.save();
        let saldo = saldoDB.saldo + req.body.cantidad;

        await ingresoDB.save();
        return res.json({
            ok: true,
            msg: 'Se ha registrado un ingreso correctamente',
        })

    } catch (error) {
        
    }

});


module.exports = router;