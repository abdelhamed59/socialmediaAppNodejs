import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sendEmail from "../../utili/sendEmail.js";
import handleError from "../../middleware/handelAsyncError.js";
import AppError from "../../utili/appError.js";
import userModel from '../../DB/models/user/user.model.js';


const signUp = handleError(async (req, res) => {
    req.body.username = `${req.body.firstName} ${req.body.lastName} `
    const user = await userModel.insertMany(req.body)
    user[0].password = undefined
    res.status(201).json({ message: "userAdded", user })
})

const signIn = handleError(async (req, res, next) => {
    let { email } = req.body
    const user = await userModel.findOne({email})
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        user.status = "online"
        await user.save()
        const token = jwt.sign({ id: user._id, role:user.role, name: user.username }, "auth")
        res.status(200).json({ message: "wellcom", token })
    } else {
        next(new AppError( "invalid email or password", 404))
    }

})

const updateUser = handleError(async (req, res,next) => {
    let { email, mobileNumber,lastName, firstName } = req.body;
    const account = await userModel.findOne({email})
    if (account) {
        next(new AppError( "account already exist", 409))
    } else {
        const user = await userModel.findByIdAndUpdate({ _id: req.user.id }, { email, mobileNumber, lastName, firstName }, { new: true })
        user.password = undefined
        res.status(200).json(user)
    }
})

const deleteUser = handleError(async (req, res,next) => {
   
        const user = await userModel.deleteOne({ _id: req.user.id })
        res.status(200).json({ message: "user deleted" })
    

})

const getUserData = handleError(async (req, res) => {
    const user = await userModel.findOne({ _id: req.user.id }).select("-password")
    res.status(200).json({ message: "User Data", user })
})

const getAnotherUserData = handleError(async (req, res,next) => {
    let { id } = req.params
    const user = await userModel.findOne({ _id: id }).select("-_id username mobileNumber email")
    if(!user) return next(new AppError( "accunt not found" , 404))

    res.status(200).json({ message: "User Data", user })
})

const updatePassword = handleError(async (req, res) => {
    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 8)
    const user = await userModel.findByIdAndUpdate({ _id: req.user.id }, { password: req.body.newPassword })
    res.status(200).json({ message: "password updated" })
})

// the next two function related to forgetpassword API
const getOTP = handleError(async (req, res,next) => {
    let { email } = req.body;
    const code = Math.floor(100000000 + Math.random() * 900000000);
    const user = await userModel.findOne({ email })
    if (!user) {
        next(new AppError( "accunt not found" , 404))
    } else {
        user.OTP = code;
        sendEmail(code, email)
        await user.save()
        res.status(200).json({ message: "check your email for OTP" })

    }

})
const resetPassword = handleError(async (req, res,next) => {
    let { OTP, newPassword } = req.body;
    const user = await userModel.findOne({ OTP })
    if (!user) {
        next(new AppError("invalid OTP", 404))
    } else {

        user.password = bcrypt.hashSync(newPassword, 8)
        user.OTP = undefined
        await user.save()
        res.status(200).json({ message: "success please signIn" })

    }

})





export {
    getUserData,
    signUp,
    signIn,
    updateUser,
    deleteUser,
    getAnotherUserData,
    updatePassword,
    getOTP,
    resetPassword,
}