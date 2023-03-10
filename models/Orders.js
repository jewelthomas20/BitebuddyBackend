const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    order_data:{
        type:Array,
        required:true,
    },
    location:{
        type:Array,
        require:true
    }
})

const Order=new mongoose.model('order',orderSchema)

module.exports =Order