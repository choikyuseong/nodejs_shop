const express = require('express');
const router = express.Router();


router.get('/' , (req , res , next) => {
    res.status(200).json({
        message:'handung Get requests to /product'
    });
});

router.post('/' , (req , res , next) => {
    res.status(200).json({
        message:'handung post requests to /product'
    });
});


router.get('/:productId' , (req , res , next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json ({
            message:'you discoverd th special ID',
            id : id
        });
    }else{
        res.status(200).json ({
            message:'you passed  ID',

        });
    }
});



router.patch('/:productId' , (req , res , next) => {

        res.status(200).json ({
            message:'update prodoct',
        });

});




router.delete('/:productId' , (req , res , next) => {

    res.status(200).json ({
        message:'delete prodoct',
    });

});



module.exports = router;