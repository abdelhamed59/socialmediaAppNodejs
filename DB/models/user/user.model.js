import mongoose from "mongoose"

const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        default:"User"
    },
    status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
    },
    OTP:{
        type: String,
    }
})
const userModel= mongoose.model("User",userSchema)

export default userModel