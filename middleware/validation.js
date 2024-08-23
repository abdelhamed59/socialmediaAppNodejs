import AppError from "../utili/appError.js";

export const validation=(userSchema)=>{
    return(req,res,next)=>{
        let validation=userSchema.validate(req.body,{abortEarly:false});
        if(validation.error?.details){
            let errorMessage=validation.error?.details.map(ele=>ele.message)
                next(new AppError(errorMessage,422))
            
        }else{
            next()
        }
    }
   
}