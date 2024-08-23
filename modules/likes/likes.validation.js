import joi from "joi"

const likesSchema=joi.object({
    addedBy: joi.string(),
    postId:joi.string()
})
export default likesSchema