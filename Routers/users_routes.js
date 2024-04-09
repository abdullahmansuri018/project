const express=require("express")
let router=express.Router();
let {usersRegistration,usersLogin,getAlluserContest,userParticipated,getuserParticipation}=require("../Controller/users_controller")
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
router.post("/usersRegistration",usersRegistration)
router.post("/usersLogin",usersLogin)
router.get("/getAlluserContest",getAlluserContest)
router.post("/userParticipated",userParticipated)
router.get("/getuserParticipation",getuserParticipation)

module.exports=router