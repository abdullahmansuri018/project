let mongoose=require("mongoose")
const joi=require("joi")

let usersSchema=mongoose.Schema({
        Fullname:String,
        Email:String,
        Address:String,
        PhoneNumber:Number,
        alternatePhoneNumber:Number,
        Age:Number,
        City:String,
        State:String,
        Country:String,
        Username:String,
        Password:String,
        isDeleted:{type:Boolean,default:false},
        isWinner:{type:Boolean,default:false}

},
{
        timeStamps:true
})
 let usersJoi=joi.object({
        Fullname:joi.string().required(),
        Email:joi.string().required(),
        Address:joi.string().required(),
        PhoneNumber:joi.number().required(),
        alternatePhoneNumber:joi.number().required(),
        Age:joi.number().required(),
        City:joi.string().required(),
        State:joi.string().required(),
        Country:joi.string().required(),
        Username:joi.string().required(),
        Password:joi.string().required()
 })



let usersModel=mongoose.model('users',usersSchema,'users')
module.exports={usersModel,usersJoi}