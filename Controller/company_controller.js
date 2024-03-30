const {default:monoose}=require("mongoose")
const{companyModel,companyJoi}=require("../Model/company_model")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const { contestModel,contestJoi } = require("../Model/contest_model")
const companyRegistration=(req,res)=>{
    const {error,value}=companyJoi.validate(req.body)
    let encryptedPassword=bcrypt.hashSync(value.Password,10)
    console.log(encryptedPassword)
    if(error)
    {
        console.log(error)
        res.send({message:"validate error"})
    }
    else{
        value.Password=encryptedPassword
        const company=new companyModel(value)
        company.save()
        .then(()=>{
            res.send({message:"company registered"})
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"error in registaring company details"})
        })

    }
}

const companyLogin=(req,res)=>{
    let password=req.body.Password
    companyModel.findOne({Email:req.body.Email})
    .then((data)=>{
        let check=bcrypt.compareSync(password,data.Password)
        console.log("data retrieve successfully")
        if(check==true)
        {
        let token=jwt.sign({Email:data.Email,Password:data.Password},'abd') 
        console.log(token)   
        res.send({isSuccess:true,message:"login successfully",token})
        }
        else
        {
            res.send({isSuccess:false,message:"user and password is incorrect"})
        }
    })
    .catch((err2)=>{
        console.log(err2)
        res.send({message:"error in retreiving data"})
    })
}

const createContest=(req,res)=>{
    const {error,value}=contestJoi.validate(req.body)
    if(error)
    {
        console.log(error)
        res.send({message:"validate error in creating contest"})
    }
    const contest=new contestModel(value)
    contest.save()
    .then((ok)=>{
        console.log(ok)
        res.send({message:"contest created"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"error in creating contest"})
    })
} 

const getAllContest=((req,res)=>{
    contestModel.find({Fullname:req.body.Fullname})
    .then((data)=>{
        console.log({message:"contest retrieved"})
        res.send({data})
    })
    .catch((err1)=>{
        console.log(err1)
        res.send({message:"error in retrieving contest"})
    })
    
})

module.exports={companyRegistration,companyLogin,createContest,getAllContest}