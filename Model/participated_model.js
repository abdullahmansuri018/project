const { boolean } = require("joi")
let mongoose=require("mongoose")

let participatedSchema=mongoose.Schema({
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"users"
        },
        contestID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"contest"
        },
        isDeleted:{
            type:Boolean,
            default:false
        }

})

let participatedModel=mongoose.model("participation",participatedSchema)

module.exports={participatedModel}