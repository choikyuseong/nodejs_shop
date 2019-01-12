
const express = require('express');
// router가 express 기능을 함?
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../models/product');



const storage = multer.diskStorage({ destination : function (req , file , cd) {
        cd(null , './uploads/');

    },
    filename: function (req , file , cd) {
        cd(null , new Date().toISOString() + file.originalname);

    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage : storage,
    limits : {
        filesize: 1024 * 1024 * 5
    },
    filefilter: fileFilter
});



// 라우터.get  값을 우리가 보고싶을때 가져와야할때
router.get('/' , (req , res , next) => {



    Product.find()
    .select('name price _id productImage')
    .exec()
        .then( docs => {

            res.status(200).json(docs);

             const asd = {
                 count : docs.length,  //데이타 갯수
                 products: docs.map(doc =>{
                    return{
                        name:doc.name,
                        price:doc.price,
                        productImage:doc.productImage,
                        _id:doc._id
                    }
                })
             }


        })
        .catch( err =>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

    // console.log(asd);

    // res.status(200).json(asd);


});




// 값을 우리가 보낼때 요청전문을 보낼때 정도?
router.post('/' ,upload.single('productImage'), (req , res , next) => {

    //post할때 값을 읽어오는 부분  body의 name을 req해와서 name에 지정?  price도 같음 그걸 product에 지정
    // const product  = {
    //     name: req.body.name,
    //     price: req.body.price
    // };

    // mongoose db 사용부분 하지만 지금 주석풀고 실행하면 에러발생으로 주석했습니다
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price,
        productImage:req.file.path
     });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message:"Created product successfully",
                createdProduct:{
                    name:result.name,
                    price:result.price,
                    productImage:result.productImage,
                    _id:result._id,
                    result: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/'+result._id
                    }
                }
            });

        })

        .catch(  err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
    });

});



// 값을 우리가 해당 productID로 찾을때   http://localhost:3000/products/special   등
router.get('/:productId' , (req , res , next) => {
    const id = req.params.productId;

    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then( doc =>{
            console.log("From database" , doc);
            if (doc){
                res.status(200).json({
                    product : doc,
                    request: {
                        type:"GET",
                        url: "http://localhost:3000/products"
                    }
                });
            }else{
                res.status(404).json({
                    message:"No vaild entry found for provide ID"
                });
            }
        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });


    // if (id === 'special') {
    //     // productID 가 special 일때
    //     // =이 3개 : 타입까지 동일
    //     res.status(200).json ({
    //         message:'you discoverd th special ID',
    //         id : id
    //     });
    // }else{
    //     // productID 가 special 아닐때
    //     res.status(200).json ({
    //         message:'you passed  ID'
    //
    //     });
    // }


});


// patch productId의 변경이 필요한경우
router.patch('/:productId' , (req , res , next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Product.update({_id:id} , {$set:updateOps})
        .exec()
        .then( result=>{
            res.status(200).json({
                message: "product updated",
                request: {
                    type:"GET",
                    url: "http://localhost:3000/products/" + id
                }
            })

        })
        .catch( err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

        // res.status(200).json ({
        //     message:'update prodoct'
        // });

});



// patch productId의 삭제가 필요한경우
router.delete('/:productId' , (req , res , next) => {

    // res.status(200).json ({
    //     message:'delete prodoct'
    // });
    const id = req.params.productId;
    Product.remove({_id: id})
        .exec()
        .then( result =>{
            res.status(200).json({
                message: "product deleted",
                request: {
                    type:"post",
                    url: "http://localhost:3000/products/" + id,
                    body:{name:"String" , price:"Number"}
                }
            });


        })

        .catch(  err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});



// router가 작동을 핧수있도록 써줘야하는 줄
module.exports = router;