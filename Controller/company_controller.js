const {default:mongoose}=require("mongoose")
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
        res.send({message:"validate error",error})
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
            res.send({message:"error in registaring company details",err})
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
        res.send({message:"error in retreiving data",err2})
    })
}

const createContest=(req,res)=>{
    console.log(req.body)
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
    .catch((err3)=>{
        console.log(err3)
        res.send({message:"error in creating contest",err3})
        return;
    })
} 

const getcompanyContest=((req,res)=>{
    contestModel.find({isDeleted:false}).select("productName ProductSummary NoOfTickets NoOfwinner ProductCost")
    .then((data)=>{
        console.log({message:"contest retrieved"})
        res.send({data})
    })
    .catch((err4)=>{
        console.log(err4)
        res.send({message:"error in retrieving contest",err4})
    })
    
})

const updateCompanyContest=(req,res)=>{
    contestModel.updateOne({_id:req.query.id},req.body)
    .then((data)=>{
        res.send({message:"contest updated",data})
    })
    .catch((err5)=>{
        console.log(err5)
        res.send({message:"error in updating from company",err5})
    })
}

const deletecompanyContest=(req,res)=>{
    contestModel.updateOne({_id:req.query.id},{isDeleted:true})
    .then((data)=>{
        res.send({message:"contest deleted"})
    })
    .catch((err6)=>{
        console.log(err6)
        res.send({message:"error in deleting contest",err6})
    })
}


module.exports={companyRegistration,companyLogin,createContest,getcompanyContest,updateCompanyContest,deletecompanyContest}