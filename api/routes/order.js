const express = require('express');
const router = express.Router();


router.get('/' , (req , res , next) => {
    res.status(200).json({
        message:'handung Get requests to /order'
    });
});

router.post('/' , (req , res , next) => {
    res.status(200).json({
        message:'handung post requests to /order'
    });
});


router.get('/:orderId' , (req , res , next) => {
    const id = req.params.orderId;


    if (id === '123456') {
        res.status(200).json ({
            message:'you discoverd th 123456 ID',
            id : id
        });
    }else{
        // productID 가 special 아닐때
        res.status(200).json ({
            message:'you passed  ID'

        });
    }
});


router.patch('/:orderId' , (req , res , next) => {

    res.status(200).json ({
        message:'update order'
    });

});




router.delete('/:orderId' , (req , res , next) => {

    res.status(200).json ({
        message:'delete order'
    });

});



module.exports = router;