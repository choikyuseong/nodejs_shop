

// express 변수에 express 프레임워크 라이브러리를 지정  변수 express가 프레임워크 라이브러리 express 기능을 할수있도록 됩니다.
const express  = require('express');
const mongoose = require('mongoose');

// mongoose.connect(
//     "mongodb:mongodb+srv://ks:"+process.env.ATLAS_PW+"@cluster0-3wgap.mongodb.net/test?retryWrites=true"
//
// );

// app 변수에 위에서 지정된 express()    app가 express기능을 사용할수있음
const app = express();


const morgan = require('morgan');
const bodyparser = require('body-parser');

//app.use((req , res) => {
//    res.status(200).json({
//        message: 'test'
//    });

//});

// app.use( (req , res , next) => {
//     const error = new Error("not foound");
//     error.status = 404;
//     next(error);
// });
//
// app.use( (req , res , next) => {
//     res.status( error.status || 500);
//     res.json({
//         error: {
//             message:error.message
//         }
//     })
// });

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

// app.use( (req,res ,next) => {
//     res.header('Access-Control-Allow-Origin' , '*');
//     res.header('Access-Control-Allow-Headers,Origin,X-Requested-with,Content_Type , Accept , Authorization');
//
//     if (req.method === "OPTIONS") {
//         res.header('Access-Control-Allow-Methods' , 'PUT , POST , PATCH , GET , DELETE');
//         return res.status(200).toJSON({});
//     }
//     next();
// });



// app가  작동을 핧수있도록 써줘야하는 줄
module.exports = app;


//각각 products.js 와 order.js 를 불러와 변수에 넣어줍니다
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');


// app가 두개의 경로를  사용하겠다 선언
app.use( '/products' , productRoutes);
app.use( '/order' , orderRoutes);


