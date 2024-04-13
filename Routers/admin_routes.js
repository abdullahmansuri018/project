const express=require("express")
let router=express.Router();
let {adminRegistration,adminLogin,getAlladminContest,updateContest,approvedcontest,rejectContest,showrejectedcontest,getparticipatedData,giveResults}=require("../Controller/admin_controller")
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
router.get("/getAlladminContest",getAlladminContest)
router.post("/updateContest",updateContest)
router.get("/approvedcontest",approvedcontest)
router.get("/getparticipatedData",getparticipatedData)
router.get("/giveResults",giveResults)
router.get("/showrejectedcontest",showrejectedcontest)
router.post("/rejectContest",rejectContest)

module.exports=router