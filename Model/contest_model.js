let mongoose=require("mongoose")
const joi=require("joi")

let contestSchema=mongoose.Schema({
    companyID:String,
    productName:String,
    ProductSummary:String,
    ProductImage:String,
    NoOfTickets:Number,
    NoOfwinner:Number,
    ProductCost:Number,
    status:String,
    isDeleted:{type:Boolean,default:false}
})

let contestJoi=joi.object({
    companyID:joi.string().required(),
    productName:joi.string().required(),
    ProductSummary:joi.string().required(),
    ProductImage:joi.string(),
    NoOfTickets:joi.number().required(),
    NoOfwinner:joi.number().required(),
    ProductCost:joi.number().required(),
     status:joi.string().required()
})

let contestModel=mongoose.model('contest',contestSchema,'contest')
module.exports={contestModel,contestJoi}