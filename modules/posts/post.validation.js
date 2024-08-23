import joi from "joi"

const postSchema=joi.object({
    title:joi.string().min(4).max(50).required(),
    content: joi.string().min(4).max(100).required(),
    addedBy:joi.string(),
    comments:joi.string(),
    
})
export default postSchema