const express=require("express")
let router=express.Router();
let {companyRegistration,companyLogin,createContest,getcompanyContest,updateCompanyContest}=require("../Controller/company_controller")
const jwt=require('jsonwebtoken')

const mw=(req,res,next)=>{
    let token=req.headers.authorization.split(" ")[1]
    if(token!=null)
    {
        try{
            let correctToken=jwt.verify(token,'abd')
            if(correctToken!=null)
            {next()}
            else
            {
                res.send({message:"token is incorrect"})
            }
        }
        catch(err)
        {
            res.send({message:"token is not available",err:err})
        }
    }
    else
    {
        res.send({message:"token not found"})
    }
}

router.post("/companyRegistration",companyRegistration)
router.post("/companyLogin",companyLogin)
router.post("/createContest",mw,createContest)
router.get("/getcompanyContest",mw,getcompanyContest)
router.put("/updateCompanyContest",updateCompanyContest)


module.exports=router