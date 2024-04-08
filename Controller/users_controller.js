const {default:monoose}=require("mongoose")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const{usersModel,usersJoi}=require("../Model/users_model")
const { contestModel,contestJoi } = require("../Model/contest_model")
const { participatedModel } = require("../Model/participated_model")
const usersRegistration=(req,res)=>{
    const {error,value}=usersJoi.validate(req.body)
    let encryptedPassword=bcrypt.hashSync(value.Password,10)
    if(error)
    {
        console.log(error)
        res.send({message:"validate error",error})
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
            res.send({message:"error in registaring users details",err})
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
        res.send({isSuccess:true,message:"login successfully",token})
        }
        else
        {
            res.send({isSuccess:false,message:"email and password is incorrect"})
        }
    })
    .catch((err2)=>{
        console.log(err2)
        res.send({message:"error in retreiving data",err2})
    })
}

const getAlluserContest=((req,res)=>{
    contestModel.find({status:"approved"})
    .then((data)=>{
        console.log({message:"contest retrieved"})
        res.send({data})
    })
    .catch((err1)=>{
        console.log(err1)
        res.send({message:"error in retrieving contest",err1})
    })
    
})

const userParticipated=((req,res)=>{
    const participatedData=new participatedModel({
        userID:req.body.userID,
        contestID:req.body.contestID
    })
    participatedData.save()
    .then(()=>{
        res.send({message:"participation done"})
    })
    .catch((err3)=>{
        console.log(err3)
        res.send({message:"error in participation",err3})
    })
})

const getuserParticipation=((req,res)=>{
    participatedModel.find({userID:req.query.userID}).populate("userID").populate("contestID")
    .then((data)=>{
        res.send({
            data
        })
    })
    .catch((err4)=>{
        console.log(err4)
        res.send({message:"error in fatch participationData",err4})
    })
})
module.exports={usersRegistration,usersLogin,getAlluserContest,userParticipated,getuserParticipation}