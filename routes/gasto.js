
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
        
        const { saldo } = saldoDB;
        let newSaldo = saldo - req.body.cantidad;

        await Saldo.findByIdAndUpdate( '6070ebb899925b1d90a5f526', { saldo : newSaldo } );

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

router.delete( '/', async ( req, res ) => { 

    const { id } = req.headers;
    const { sumGasto } = req.body    

    try {

        //Si el usuario también quiere restar al saldo el ingreso que eliminó..
        if( sumGasto ){

            const saldoDB = await Saldo.findById('6070ebb899925b1d90a5f526');
            const { saldo } = saldoDB;

            const gastoDB = await Gasto.findById( id );
            const { cantidad } = gastoDB;

            let newSaldo = saldo + cantidad;

            //Actualizar el saldo y eliminar el ingreso de la DB 
            await saldoDB.updateOne( { saldo: newSaldo } );
            await Gasto.findByIdAndDelete( id );

            return res.json({
                ok: true,
                msg:'Se ha eliminado el gasto y se le ha sumado al saldo'
            })

        }

        await Gasto.findByIdAndDelete( id );

        return res.json({
            ok: false,
            msg: 'Gasto eliminado correctamente'
        });


    } catch (error) {
        
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Algo ha salido mal eliminando el Gasto'
        });

    }



});



module.exports = router;