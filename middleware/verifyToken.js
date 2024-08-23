import jwt from 'jsonwebtoken'
import AppError from '../utili/appError.js';

const verifyToken=(req,res,next)=>{
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, "auth", (err, decoded) => {
        if (err) return next(new AppError( "token error", 401))      
            req.user=decoded
            next()
    })
}

const Admin=(req,res,next)=>{
    const token = req.header('Authorization').replace('Bearer ', '');
    jwt.verify(token, "auth", (err, decoded) => {
        if (err) return next(new AppError( "token error", 401))  
            if (decoded.role !== 'Admin'){
                next(new AppError( "Admin only access to this", 401))
                }else{
                    req.user=decoded
                    next()
                }  
    })
}

export {
    verifyToken,
    Admin
} 