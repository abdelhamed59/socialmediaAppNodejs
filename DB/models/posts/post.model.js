import mongoose, { Types } from "mongoose"

const postSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['public', 'private'],
        default:"public"
    },

    addedBy:{
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments:{
        type: [Types.ObjectId],
        ref: 'Comment',
    },
    likes:{
        type: [Types.ObjectId],
        ref: 'Like',
    }
},{
    timestamps:true,
    versionKey:false
})
const postModel= mongoose.model("Post",postSchema)

export default postModel