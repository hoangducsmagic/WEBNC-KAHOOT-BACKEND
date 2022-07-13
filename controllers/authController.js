const catchAsync=require("../utils/catchAsync")
const AppError=require("../utils/appError")

const login=catchAsync((req,res,next)=>{
    res.json(200,"Logged in")
})

const register=catchAsync((req,res,next)=>{
    
    res.json(201,"Register")
})

module.exports={login,register}