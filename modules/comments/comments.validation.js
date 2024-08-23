import joi from "joi"

const commentSchema=joi.object({
    content: joi.string().min(4).max(200).required()
})
export default commentSchema