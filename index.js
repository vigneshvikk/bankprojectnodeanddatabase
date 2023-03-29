//import express and store into a variable that is express
const express =require("express")

//import dataService
const ds=require('./service/dataService')

//import jswt
const jwt=require("jsonwebtoken")

//app creation  (variable name we can choose anything)
const app=express()

//to convert all data from json to js
app.use(express.json())



//middleware creation
const jwtMiddleware=(req,res,next)=>{
try{    
    //acces data from request
const token=req.headers['access_header']
//verify the token with secret key
const data=jwt.verify(token,"superkey123")
console.log(data);

next()
}
catch{
    res.status(422).json(
        {
            status:false,
            message:"please login",
            statusCode:404
        })
    
}
}



//resolve api


//register post
app.post("/register",(req,res)=>{
 const result=ds.register(req.body.acno,req.body.uname,req.body.psw)

    res.status(result.statusCode).json(result)

})

//login
app.post("/login",(req,res)=>{
    const result=ds.login(req.body.acno,req.body.psw)
   
       res.status(result.statusCode).json(result)
   
   })

//deposite

app.post("/deposite",jwtMiddleware,(req,res)=>{
    const result=ds.deposite(req.body.acno,req.body.psw,req.body.amnt)
   
       res.status(result.statusCode).json(result)
   
   })

// withdraw

app.post("/withdraw",jwtMiddleware,(req,res)=>{
    const result=ds.withdraw(req.body.acno,req.body.psw,req.body.amnt)
   
       res.status(result.statusCode).json(result)
   
   })


//gettransaction

app.get("/transaction",jwtMiddleware,(req,res)=>{
    const result=ds.getTransaction(req.body.acno)
   
       res.status(result.statusCode).json(result)
   
   })



//register  post 
// login   get  
// deposite patch  
// withraw patch 
// transaction get  
// delete  delete


// app.get("/",(req,res)=>{
//     res.send('Get Method Working......')
// })

// app.post("/",(req,res)=>{
//     res.send('post Method Working......')
// })

// app.put("/",(req,res)=>{
//     res.send('Put Method Working......')
// })


// app.patch("/",(req,res)=>{
//     res.send('patch Method Working......')
// })


// app.delete("/",(req,res)=>{
//     res.send('delete Method Working......')
// })










//port set
app.listen(3000,()=>{
    console.log("server start at port 3000");
})