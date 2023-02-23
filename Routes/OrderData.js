const express=require('express');
const router=express.Router();
const Order=require('../models/Orders')


// this route is for my order where users food order will be saved and shown #CHECKOUT
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data

    await data.splice(0,0,{Order_date:req.body.order_date})

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    if (eId===null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data:[data],
                location:req.body.location
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.error(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            // await Order.findOneAndUpdate({email:req.body.email},
            //     { $push:{order_data: [data,req.body.location]}}).then(() => {
            //         res.json({ success: true })
            //     })
            // alt approach
            await Order.findOneAndUpdate({email:req.body.email},
                    { $push:{order_data: data,location: req.body.location}}).then(() => {
                        res.json({ success: true })
                    })
        } catch (error) {
            console.error(error.message)
            res.send("Server Error", error.message)
        }
    }
});


router.post('/myorder',async(req,res)=>{
    
    try {
        const myData=await Order.findOne({"email":req.body.email})
        res.json({"userData":myData})    

    } catch (error) {
        res.send("Server Error", error.message)
}

})

module.exports = router
