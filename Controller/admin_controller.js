const mongoose=require("mongoose")
let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const{adminModel,adminJoi}=require("../Model/admin_model")
const { contestJoi, contestModel } = require("../Model/contest_model")
const { participatedModel } = require("../Model/participated_model")
const { usersModel } = require("../Model/users_model")
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
            res.send({message:"error in registaring admin details",err})
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
            res.send({message:"error in retreiving data",err2})
        })
}

const getAlladminContest=((req,res)=>{
    contestModel.find({status:"approved"})
    .then((data)=>{
        console.log({message:"contest retrieved"})
        res.send({data})
    })
    .catch((error1)=>{
        console.log(error1)
        res.send({message:"error in retrieving contest",error1})
    })
    
})


const updateContest=(req,res)=>{
    contestModel.updateOne({_id:req.query._id,},{status:"approved"})
    .then((data)=>{
        res.send({message:"contest updated",data})
    })
    .catch((err3)=>{
        console.log(err3)
        res.send({message:"error in updating from admin",err3})
    })
}

const approvedcontest=(req,res)=>{
    contestModel.find({status:"approved"})
    .then((data)=>{
        res.send({data})
    })
    .catch((err4)=>{
        console.log(err4)
        res.send({message:"error in showing approved contest",err4})
    })
}

const getparticipatedData=((req,res)=>{
    participatedModel.find()
    .then((data)=>{
        res.send({data})
    })
    .catch((err5)=>{
        console.log(err5)
        res.send({mesaage:"error in fetching participatedData",err5})
    })
})

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateUniqueRandomNumbers(min, max, count) {
    if (max - min + 1 < count) {
        throw new Error("Cannot generate unique random numbers. Range is smaller than count.");
    }

    let numbers = [];
    for (let i = min; i <= max; i++) {
        numbers.push(i);
    }

    numbers = shuffleArray(numbers);

    return numbers.slice(0, count);
}


const giveResults=((req,res)=>{
    let winArray=[];
    participatedModel.find({contestID:req.body.contestID}).populate("contestID")
    .then(async(data)=>{
        let maxnumber=data[0].contestID.NoOfTickets
        let winnerNO=data[0].contestID.NoOfProducts
        // console.log(winnerNO)
        // console.log(maxnumber)
       let UniqueRandomNumbers = generateUniqueRandomNumbers(0,maxnumber-1, winnerNO)
        for(let randomNumber of UniqueRandomNumbers)
        {
          
            let winnerID=data[randomNumber].userID.toString()
           
          let winData= await getUserFromUserId(winnerID)  
           winArray.push(winData)    
        }
        
        res.send(winArray)
    })
    .catch((err6)=>{
        console.log(err6)
        res.send({message:"error in declaring result",err6})
    })       
})

const getUserFromUserId = async (userId)=>{
    let data = await usersModel.find({_id : userId, isDeleted: false}).select('Email Fullname')
    console.log("data----", data)
    return data[0]
}
module.exports={adminRegistration,adminLogin,getAlladminContest,updateContest,approvedcontest,getparticipatedData,giveResults}