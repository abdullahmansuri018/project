let mongoose=require("mongoose")
const joi=require("joi")

let adminSchema=mongoose.Schema({
        Email:String,
        Password:String,
})
 let adminJoi=joi.object({
        Email:joi.string().required(),
        Password:joi.string().required(),
 })



let adminModel=mongoose.model('admin',adminSchema,'admin')
module.exports={adminModel,adminJoi}