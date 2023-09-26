//import jswt
const jwt=require("jsonwebtoken")

//import database
const db=require("./db")






register=(acno,uname,psw)=>{
//store the resolved output of findone in a variable user
  return db.User.findOne({acno}).then(user=>{
    //if acno present in db then get the object of that user else null response 
    if(user){
      return {
        status:false,
        message:"user already present",
        statusCode:404
    }
    }else{
newUser=new db.User({
  username:uname,
  acno,
  password:psw,
  balance:0,
  transaction:[]
})
newUser.save()
return {
  status:true,
  message:"registered",
  statusCode:200
      } 

    }
    })

  
  }


  
  login=(acno,psw)=>{

   return db.User.findOne({acno,password:psw}).then(user=>{
      if(user){
        currentUser=user.username
        currentAcno=acno
        const token=jwt.sign({acno},"superkey123")  // first it expect unique data of login and any string data we do want

      
        return {
          status:true,
          message:"login success",
          statusCode:200,
          currentUser,
          currentAcno,
          token
      } 
      }else {
        return  {
          status:false,
          message:"incurrect password or account number",
          statusCode:404
          
      } 
      }
    })



  }

  deposite=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)  //to convert string amnt to intiger

    return db.User.findOne({acno,password:psw}).then(user=>{
      if(user){
        user.balance+=amount
        user.transaction.push({Type:"credit" ,Amount:amount })
        user.save()
        return   {
          status:true,
          message:`your account has been credited with amount ${amount} and balance is ${ user.balance }`,
          statusCode:200
          
      }
      } else{
        return {
          status:false,
          message:"incurrect password or account number",
          statusCode:404
          
      }
      }
    })
  
  }





withdraw=(acno,psw,amnt)=> {
  var amount=parseInt(amnt)  //to convert string amnt to intiger

  return db.User.findOne({acno,password:psw}).then(user=>{
    if(user){
      if(amount<=user.balance){
        user.balance-=amount
        user.transaction.push({Type:"debit" ,Amount:amount })
        user.save()
        return   {
          status:true,
          message:`your account has been debited with amount ${amount} and balance is ${ user.balance }`,
          statusCode:200
          
      }
      }else{
        return {
          status:false,
          message:"insufficent balance",
          statusCode:404
          
      } 
      }
    }else{
      return {
        status:false,
        message:"incurrect password or account number",
        statusCode:404
        
    }
    }
  })



  // if(acno in userDetails){
  //   if(psw==userDetails[acno]["password"]){
  //      if(amount<=userDetails[acno]["balance"]){
  //     userDetails[acno]["balance"]-=amount

      
  //     //add transaction data

  //     userDetails[acno]["transaction"].push(
  //       {
  //         Type:"debit" ,
  //         Amount:amount 
  //       }
  //     )
// console.log(userDetsils);
   

  //     return   {
  //       status:true,
  //       message:`your account has been debited with amount ${amount} and balance is ${ userDetails[acno]["balance"] }`,
  //       statusCode:200
        
  //   } 
      
  //   }else{
  //     return {
  //       status:false,
  //       message:"insufficent balance",
  //       statusCode:404
        
  //   }   
  //  }
  //   }
    
  //   else {
  //     return {
  //       status:false,
  //       message:"incurrect password",
  //       statusCode:404
        
  //   }
  //   }

  // }else{
  //   return {
  //     status:false,
  //     message:"incurrect account number",
  //     statusCode:404
      
  // }
  // }
}

getTransaction=(acno)=>{
return db.User.findOne({acno}).then(user=>{
  if(user){
    return {
      status:true,
      transaction: user.transaction,
      statusCode:200
      }
  }
})
 
 

}


deleteAcc=(acno)=>{
return db.User.deleteOne({acno}).then(user=>{
  if(user){
    return {
      status:true,
      message:"ac delete",
      statusCode:200
      }
  }else{
    return {
      status:false,
      message:"ac not present",
      statusCode:401
      }
  }
})
}


module.exports={
  register,login,deposite,withdraw,getTransaction,deleteAcc
}