import joi from "joi"

const userSchema=joi.object({
    firstName:joi.string().min(4).max(15).required(),
    lastName: joi.string().min(4).max(15).required(),
    username:joi.string(),
    email:joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^[A-Z][a-z0-9]{3,8}$')).required(),
    mobileNumber: joi.string().pattern(new RegExp('^01[0125][0-9]{8}$')).required(),
    OTP:joi.string()
})
export default userSchema