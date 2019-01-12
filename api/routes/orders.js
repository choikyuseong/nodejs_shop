const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');




router.get('/' , (req , res , next) => {
    // res.status(200).json({
    //     message:'handung Get requests to /order'
    // });


    Order.find()
        .select("product quantity _id")
        .exec()
        .then( docs => {
            res.status(200).json({
                count:docs.length,
                orders:docs.map(doc =>{
                    return {
                        _id:doc.id,
                        product:doc.product,
                        quantity: doc.quantity,
                        request:{
                            type:"get",
                            url:"http://localhost:3000/orders/"+doc._id
                        }
                    };
            })
        });
        })
        .catch();
});

router.post('/' , (req , res , next) => {

        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });

        order
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json(result);

            })
            .catch( err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });


});


router.get('/:orderId' , (req , res , next) => {
    // const id = req.params.orderId;
    //
    //
    // if (id === '123456') {
    //     res.status(200).json ({
    //         message:'you discoverd th 123456 ID',
    //         id : id
    //     });
    // }else{
    //     // productID 가 special 아닐때
    //     res.status(200).json ({
    //         message:'you passed  ID'
    //
    //     });
    // }

    Order.findById(req.params.orderId)
        .exec()
        .then( order => {
            if(!order) {
                return res.status(404).json({
                    message: "값이 없음"
                });
            }else{
                return res.status(201).json({
                    message: "값이 있음"
                });
            }
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});





router.patch('/:orderId' , (req , res , next) => {

    res.status(200).json ({
        message:'update order'
    });

});




router.delete('/:orderId' , (req , res , next) => {
    Order
        .remove({ _id: req.params.orderId})
        .exec()
        .then( result =>{
            res.status(200).json({
                message:"삭제성공",
                request:{
                    type:"get",
                    url:"http://localhost:3000/orders",
                    body:{ productId: "ID" , quantity:"Number"}
                }
            });

        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

});



module.exports = router;