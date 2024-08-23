import mongoose, { Types } from "mongoose"

const commentsSchema= new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    addedBy:{
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    postId:{
        type: Types.ObjectId,
        ref: 'Post',
        required: true
    }
},{
    timestamps:true,
    versionKey:false
})
const commentsModel= mongoose.model("Comment",commentsSchema)

export default commentsModel