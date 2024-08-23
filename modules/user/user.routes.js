import express from 'express'
import {  deleteUser, resetPassword, getAnotherUserData, getOTP, getUserData, signIn, signUp, updatePassword, updateUser } from './user.controller.js'
import { checkEmail } from '../../middleware/checkEmail.js'
import checkPassword from '../../middleware/checkPassword.js'
import { validation } from '../../middleware/validation.js'
import userSchema from './user.validation.js'
import { verifyToken } from '../../middleware/verifyToken.js'

const userRoutes=express.Router()


userRoutes.post("/signUp",validation(userSchema),checkEmail,signUp)
userRoutes.post("/signIn",signIn)
userRoutes.put("/update",verifyToken,updateUser)
userRoutes.delete("/delete",verifyToken,deleteUser)
userRoutes.get("/userInfo",verifyToken,getUserData)
userRoutes.get("/anotherAccount/:id",verifyToken,getAnotherUserData)
userRoutes.put("/updatePassword",verifyToken,checkPassword,updatePassword)
userRoutes.post("/forgetPassword",getOTP)
userRoutes.post("/resetPassword",resetPassword)



export default userRoutes