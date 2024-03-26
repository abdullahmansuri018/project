const {default:monoose}=require("mongoose")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const{adminModel,adminJoi}=require("../Model/admin_model")
const { contestJoi, contestModel } = require("../Model/contest_model")
const adminRegistration=(req,res)=>{
    const {error,value}=adminJoi.validate(req.body)
    let encryptedPassword=bcrypt.hashSync(value.Password,10)
    if(error)
    {
        console.log(error)
        res.send({message:"validate error"})
    }
    else{
        value.Password=encryptedPassword
        const admin=new adminModel(value)
        admin.save()
        .then(()=>{
            res.send({message:"admin registered"})
        })
        .catch((err)=>{
            console.log(err)
            res.send({message:"error in registaring admin details"})
        })

    }
}

const adminLogin=(req,res)=>{
        let password=req.body.Password
        adminModel.findOne({Email:req.body.Email})
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

const updateContest=(req,res)=>{
    contestModel.updateOne({contestId:req.query.contestId},req.body)
    .then((data)=>{
        res.send({data})
    })
    .catch((err3)=>{
        console.log(err3)
        res.send({message:"error in updating from admin"})
    })
}

const approvedcontest=(req,res)=>{
    contestModel.find({status:"approved"})
    .then((data)=>{
        res.send({data})
    })
    .catch((err4)=>{
        console.log(err4)
        res.send({message:"error in showing approved contest"})
    })
}

module.exports={adminRegistration,adminLogin,updateContest,approvedcontest}