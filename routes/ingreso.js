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
        
        const { saldo } = saldoDB;
        let newSaldo = req.body.cantidad + saldo;


        await Saldo.findByIdAndUpdate( '6070ebb899925b1d90a5f526', { saldo : newSaldo } );

        return res.json({
            ok: true,
            msg: 'Se ha registrado un ingreso correctamente',
        })

    } catch (error) {
        
    }

});


router.delete( '/', async ( req, res ) => { 

    const { id } = req.headers;
    const { restIngreso } = req.body    

    try {

        //Si el usuario también quiere restar al saldo el ingreso que eliminó..
        if( restIngreso ){

            const saldoDB = await Saldo.findById('6070ebb899925b1d90a5f526');
            const { saldo } = saldoDB;

            const ingresoDB = await Ingreso.findById( id );
            const { cantidad } = ingresoDB

            let newSaldo = saldo - cantidad;

            //Actualizar el saldo y eliminar el ingreso de la DB 
            await saldoDB.updateOne( { saldo: newSaldo } );
            await Ingreso.findByIdAndDelete( id );

            return res.json({
                ok: true,
                msg:'Se ha eliminado el ingreso y se le ha restado al saldo'
            })

        }

        await Ingreso.findByIdAndDelete( id );

        return res.json({
            ok: false,
            msg: 'Ingreso eliminado correctamente'
        });


    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal eliminando el ingreso'
        });

    }


});

module.exports = router;