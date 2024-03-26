let mongoose=require("mongoose")
require('dotenv').config()
let url=process.env.URL
mongoose.connect(url)
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
});