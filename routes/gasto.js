
/* 

Ruta: /api/gasto

*/

const { Router } = require('express');

const Gasto = require('../models/gasto')
const Saldo = require('../models/saldo');

const router = Router();



router.get( '/', async (req, res) => {    


    const gastosDB = await Gasto.find();
    if( !gastosDB ){
        return res.json({
            msg: 'No hay gastos registrados '
        });
    }


    try {
    
            return res.status(200).json({
                ok: true,
                gastos: gastosDB     
            })

        }
    catch (error) 
    {
        
            return res.status(400).json({
                ok: false,
                msg: 'Hubo un error registrando un gasto',
                error
            });

    }

});


router.post( '/', async (req, res) => {    

    const gastoDB = new Gasto( req.body );
    const saldoDB = await Saldo.findById('6070ebb899925b1d90a5f526');

    try {
        
        await gastoDB.save();
        let saldo = saldoDB.saldo - req.body.cantidad;


        return res.json({
            ok: true,
            msg: 'Se ha registrado un gasto correctamente',
        })

    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Hubo un error registrando el gasto'
        });
    }

});


module.exports = router;