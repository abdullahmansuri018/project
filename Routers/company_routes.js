const express=require("express")
let router=express.Router();
let {companyRegistration,companyLogin,createContest,getcompanyContest,updateCompanyContest,deletecompanyContest}=require("../Controller/company_controller")
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
router.post("/createContest",createContest)
router.get("/getcompanyContest",getcompanyContest)
router.post("/updateCompanyContest",updateCompanyContest)
router.post("/deletecompanyContest",deletecompanyContest)


module.exports=router