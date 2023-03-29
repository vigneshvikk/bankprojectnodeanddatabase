const mongoose=require("mongoose")
//conection sting

mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})

//model creation
const User=mongoose.model("User",
{   
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]

})