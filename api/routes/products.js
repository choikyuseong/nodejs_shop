
const express = require('express');

// router가 express 기능을 함?
const router = express.Router();
const mongoose = require('mongoose')
const Product = require('../models/product');


// 라우터.get  값을 우리가 보고싶을때 가져와야할때
router.get('/' , (req , res , next) => {
    res.status(200).json({
        message:'handung Get requests to /products'
    });
});


// 값을 우리가 보낼때 요청전문을 보낼때 정도?
router.post('/' , (req , res , next) => {

    //post할때 값을 읽어오는 부분  body의 name을 req해와서 name에 지정?  price도 같음 그걸 product에 지정
    const product  = {
        name: req.body.name,
        price: req.body.price
    };


    // mongoose db 사용부분 하지만 지금 주석풀고 실행하면 에러발생으로 주석했습니다
    // const product = new Product({
    //     _id: new mongoose.Types.ObjectID(),
    //     name:req.body.name,
    //     price:req.body.price
    // });


    res.status(200).json({
        message:'handung post requests to /products',

        //위에서 파싱한 product를 생성하는부분? createdstatus 정확한역활 찾아봐야함
        createdstatus : product
    });



});



// 값을 우리가 해당 productID로 찾을때   http://localhost:3000/products/special   등
router.get('/:productId' , (req , res , next) => {
    const id = req.params.productId;


    if (id === 'special') {
        // productID 가 special 일때
        // =이 3개 : 타입까지 동일
        res.status(200).json ({
            message:'you discoverd th special ID',
            id : id
        });
    }else{
        // productID 가 special 아닐때
        res.status(200).json ({
            message:'you passed  ID'

        });
    }
});


// patch productId의 변경이 필요한경우
router.patch('/:productId' , (req , res , next) => {

        res.status(200).json ({
            message:'update prodoct'
        });

});



// patch productId의 삭제가 필요한경우
router.delete('/:productId' , (req , res , next) => {

    res.status(200).json ({
        message:'delete prodoct'
    });

});



// router가 작동을 핧수있도록 써줘야하는 줄
module.exports = router;