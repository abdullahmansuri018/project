const {default:monoose}=require("mongoose")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const{usersModel,usersJoi}=require("../Model/users_model")
const { contestModel,contestJoi } = require("../Model/contest_model")
const usersRegistration=(req,res)=>{
    const {error,value}=usersJoi.validate(req.body)
    let encryptedPassword=bcrypt.hashSync(value.Password,10)
    if(error)
    {
        console.log(error)
        res.send({message:"validate error"})
    }
    else{
        value.Password=encryptedPassword
        const users=new usersModel(value)
        users.save()
        .then(()=>{
            res.send({message:"users registered"})
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"error in registaring users details"})
        })

    }
}

const usersLogin=(req,res)=>{
    let password=req.body.Password
    usersModel.findOne({Email:req.body.Email})
    .then((data)=>{
        let check=bcrypt.compareSync(password,data.Password)
        console.log("data retrieve successfully")
        if(check==true)
        {
        let token=jwt.sign({Email:data.Email,Password:data.Password},'abd')    
        res.send({message:"login successfully",token})
        }
        else
        {
            res.send({message:"email and password is incorrect"})
        }
    })
    .catch((err2)=>{
        console.log(err2)
        res.send({message:"error in retreiving data"})
    })
}

const getAllContest=((req,res)=>{
    contestModel.find()
    .then((data)=>{
        console.log({message:"contest retrieved"})
        res.send({data})
    })
    .catch((err1)=>{
        console.log(err1)
        res.send({message:"error in retrieving contest"})
    })
    
})

module.exports={usersRegistration,usersLogin,getAllContest}