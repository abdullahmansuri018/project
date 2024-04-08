let mongoose=require("mongoose")
const joi=require("joi")

let contestSchema=mongoose.Schema({
    productName:String,
    ProductSummary:String,
    ProjectImage:String,
    NoOfTickets:Number,
    NoOfwinner:Number,
    ProductCost:Number,
    status:String,
    isDeleted:{type:Boolean,default:false}
})

let contestJoi=joi.object({
    productName:joi.string().required(),
    ProductSummary:joi.string().required(),
    ProjectImage:joi.string().required(),
    NoOfTickets:joi.number().required(),
    NoOfwinner:joi.number().required(),
    ProductCost:joi.number().required(),
    status:joi.string().required()
})

let contestModel=mongoose.model('contest',contestSchema,'contest')
module.exports={contestModel,contestJoi}