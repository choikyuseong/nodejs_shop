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


module.exports = router;