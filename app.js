

const express  = require('express');
const app = express();


//app.use((req , res) => {
//    res.status(200).json({
//        message: 'test'
//    });

//});

module.exports = app;

const productRoutes = require('./api/route/product');
const orderRoutes = require('./api/route/order');

app.use( '/product' , productRoutes);
app.use( '/order' , orderRoutes);


