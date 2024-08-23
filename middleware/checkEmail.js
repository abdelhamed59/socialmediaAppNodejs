import userModel from "../DB/models/user/user.model.js"
import bcrypt from 'bcrypt'
import AppError from "../utili/appError.js"

const checkEmail=async(req,res,next)=>{
    let{email}=req.body
    const user= await userModel.findOne({email})
    if(user){
        next(new AppError( "u already register" , 409))
    }else{
        req.body.password=bcrypt.hashSync(req.body.password, 8)
        next()
    }

}


export{
    checkEmail
}