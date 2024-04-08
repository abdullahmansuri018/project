let mongoose=require("mongoose")
const joi=require("joi")

let companySchema=mongoose.Schema({
        Fullname:String,
        Address:String,
        Email:String,
        PhoneNumber:Number,
        alternatePhoneNumber:Number,
        GSTno:Number,
        comapnyLogo:String,
        companyCategory:String,
        Password:String,
        isDeleted:{type:Boolean,default:false}
},
{
        timeStamps:true
})
 let companyJoi=joi.object({
        Fullname:joi.string().required(),
        Address:joi.string().required(),
        Email:joi.string().required(),
        PhoneNumber:joi.number().required(),
        alternatePhoneNumber:joi.number().required(),
        GSTno:joi.number().required(),
        comapnyLogo:joi.string(),
        companyCategory:joi.string().required(),
        Password:joi.string().required()
 })



let companyModel=mongoose.model('company',companySchema,'company')
module.exports={companyModel,companyJoi}