const mongoose=require('mongoose');
mongoose.set('strictQuery', true);

const connectToMongoDB=async ()=>{
    mongoose.connect(`mongodb+srv://${process.env.userid}:${process.env.userPassword}@foodapp.nmvhocg.mongodb.net/foodappmern?retryWrites=true&w=majority`,async(err)=>{
    if(err) console.log(err)
    else{
        console.log('connected to mongodb')
        const fetchFoodItem= mongoose.connection.db.collection('food_items')
        fetchFoodItem.find({}).toArray((err,foodItems_Data)=>{
            const fetchFoodCategory=mongoose.connection.db.collection('food_category')
            fetchFoodCategory.find({}).toArray((err,foodCategory_Data)=>{
                if(err) console.log(err)
                else{
                    global.food_items=foodItems_Data;
                    global.food_category=foodCategory_Data;
                }
            })
        })
    }
    })
}

module.exports=connectToMongoDB;