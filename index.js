const express=require("express")

let app=express()
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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
  });

app.listen(port,()=>{
    console.log("server created on 5000 port")
})
