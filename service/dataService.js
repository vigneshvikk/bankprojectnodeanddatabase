//import jswt
const jwt=require("jsonwebtoken")



  userDetails={
    1000:{username:"anu",acno:1000,password:"abc123",balance:0,transaction:[]},
    1001:{username:"amal",acno:1001,password:"abc123",balance:0,transaction:[]},
    1002:{username:"arun",acno:1002,password:"abc123",balance:0,transaction:[]},
    1003:{username:"mega",acno:1003,password:"abc123",balance:0,transaction:[]}
  }


register=(acno,uname,psw)=>{
  if (acno in userDetails){
    return {
        status:false,
        message:"user already present",
        statusCode:404
    }
  }else{
    userDetails[acno]={username:uname,acno, password:psw,balance:0,transaction:[]}
    return {
        status:true,
        message:"registered",
        statusCode:200
    }  
}
  }


  
  login=(acno,psw)=>{
    if(acno in userDetails){
      if(psw==userDetails[acno]["password"]){   //       if(psw==userDetails[acnum]["password"]){   //if we want to callkey ,key must inside the quotes but acno is a variable
        //store current username

        currentUser = userDetails[acno]["username"]
  

        //store current account number
        currentAcno=acno 


        // Token Creation
        const token=jwt.sign({acno},"superkey123")  // first it expect unique data of login and any string data we do want

        return {
            status:true,
            message:"login success",
            statusCode:200,
            currentUser,
            currentAcno,
            token
        }     
     }else{
        return  {
            status:false,
            message:"incurrect password",
            statusCode:404
            
        } 
      }
    }else{
      return {
        status:false,
        message:"not registered yet",
        statusCode:404
        
    } 
    }

  }

  deposite=(acno,psw,amnt)=>{
    var amount=parseInt(amnt)  //to convert string amnt to intiger
    if(acno in userDetails){
      if(psw==userDetails[acno]["password"]){

        userDetails[acno]["balance"]+=amount

        //add transaction data

        userDetails[acno]["transaction"].push(
          {
            Type:"credit" ,
            Amount:amount ,
          }
        )

        // console.log(userDetsils);
     return   {
          status:true,
          message:`your account has been credited with amount ${amount} and balance is ${ userDetails[acno]["balance"] }`,
          statusCode:200
          
      }
      }else {
        return {
          status:false,
          message:"incurrect password",
          statusCode:404
          
      }
      }

    }else{
      return {
        status:false,
        message:"incurrect account number",
        statusCode:404
        
    }
    }
  }

withdraw=(acno,psw,amnt)=> {
  var amount=parseInt(amnt)  //to convert string amnt to intiger
  if(acno in userDetails){
    if(psw==userDetails[acno]["password"]){
       if(amount<=userDetails[acno]["balance"]){
      userDetails[acno]["balance"]-=amount

      
      //add transaction data

      userDetails[acno]["transaction"].push(
        {
          Type:"debit" ,
          Amount:amount 
        }
      )
// console.log(userDetsils);
   

      return   {
        status:true,
        message:`your account has been debited with amount ${amount} and balance is ${ userDetails[acno]["balance"] }`,
        statusCode:200
        
    } 
      
    }else{
      return {
        status:false,
        message:"insufficent balance",
        statusCode:404
        
    }   
   }
    }
    
    else {
      return {
        status:false,
        message:"incurrect password",
        statusCode:404
        
    }
    }

  }else{
    return {
      status:false,
      message:"incurrect account number",
      statusCode:404
      
  }
  }
}

getTransaction=(acno)=>{

  return {
    status:true,
    transaction: userDetails[acno].transaction,
    statusCode:200
    }
 

}


module.exports={
  register,login,deposite,withdraw,getTransaction
}