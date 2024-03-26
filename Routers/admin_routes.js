const express=require("express")
let router=express.Router();
let {adminRegistration,adminLogin,updateContest,approvedcontest}=require("../Controller/admin_controller")
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

router.post("/adminRegistration",adminRegistration)
router.post("/adminLogin",adminLogin)
router.put("/updateContest",mw,updateContest)
router.get("/approvedcontest",mw,approvedcontest)

module.exports=router