//import express and store into a variable that is express
const express =require("express")

//import dataService
const ds=require('./service/dataService')

//import cors
const cors=require("cors")

//import jswt
const jwt=require("jsonwebtoken")

//app creation  (variable name we can choose anything)
const app=express()

//to convert all data from json to js
app.use(express.json())


// integrate app with frontend
app.use(cors({origin:"http://localhost:4200"}))



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
 ds.register(req.body.acno,req.body.uname,req.body.psw).then(result=>{
    res.status(result.statusCode).json(result)

 })


})

//login
app.post("/login",(req,res)=>{
    ds.login(req.body.acno,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
   
   })

//deposite

app.post("/deposite",jwtMiddleware,(req,res)=>{
    const result=ds.deposite(req.body.acno,req.body.psw,req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)
    })
   
   
   })

// withdraw

app.post("/withdraw",jwtMiddleware,(req,res)=>{
    ds.withdraw(req.body.acno,req.body.psw,req.body.amnt).then(result=>{
        res.status(result.statusCode).json(result)

    })
   
    //    res.status(result.statusCode).json(result)
   
   })


//gettransaction

app.post("/transaction",jwtMiddleware,(req,res)=>{
    ds.getTransaction(req.body.acno).then(result=>{
        res.status(result.statusCode).json(result)
    })
   
      
   
   })


//delete      
                    //to store params variable  
app.delete("/delete/:acno",jwtMiddleware,(req,res)=>{
                //delete acc comes as a params
    ds.deleteAcc(req.params.acno).then(result=>{
        res.status(result.statusCode).json(result)

    })
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