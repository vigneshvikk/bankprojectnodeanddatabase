const mongoose=require("mongoose")
//conection sting
mongoose.connect("mongodb://localhost:27017/bankServer",{useNewUrlParser:true})

//model creation
//scheema means fields amd values
const User=mongoose.model("User",
{   
    username:String,
    acno:Number,
    password:String,
    balance:Number,
    transaction:[]

})

module.exports={
    User
}