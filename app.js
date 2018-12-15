

// express 변수에 express 프레임워크 라이브러리를 대입  변수 express가 프레임워크 라이브러리 express 기능을 할수있도록 됩니다.
const express  = require('express');

// app 변수에 위에서 지정된 express()    app가 express기능을 사용할수있음
const app = express();


//app.use((req , res) => {
//    res.status(200).json({
//        message: 'test'
//    });

//});


// app가  제기능을 핧수있도록 써줘야하는 줄
module.exports = app;


//각각 products.js 와 order.js 를 대입
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/order');


// app가 두개의 경로를 사용할수있도록 선언
app.use( '/products' , productRoutes);
app.use( '/order' , orderRoutes);


