const express=require('express');
const router=express.Router();

router.get('/displayfood',(req,res)=>{
    try {
        res.send([global.food_items,global.food_category])
    } catch (error) {
        console.error(error)
    }

})

module.exports = router