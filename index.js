const express=require('express');
require('dotenv').config()
const app=express();
var cors = require('cors')
app.use(cors())
const connectToMongoDB=require('./db')
app.use(express.json());
app.use('/',require("./Routes/Auth"))
app.use('/',require("./Routes/DisplayData"))
app.use('/',require("./Routes/OrderData"))

connectToMongoDB()
app.listen(5000,()=>{
    console.log('server running')
})