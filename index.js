const express=require("express")
const cors=require("cors")
let app=express()
app.use(cors());
app.use(express.json())

require('dotenv').config()
let port=process.env.PORT
require('./dbconfigue')

const adminRoutes=require("./Routers/admin_routes")
const companyRoutes=require("./Routers/company_routes")
const usersRoutes=require("./Routers/users_routes")



app.use("/admin",adminRoutes)
app.use("/company",companyRoutes)
app.use("/users",usersRoutes)



app.listen(port,()=>{
    console.log("server created on 5000 port")
})
