import mongoose, { Types } from "mongoose"

const likesSchema= new mongoose.Schema({
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
const likesModel= mongoose.model("Like",likesSchema)

export default likesModel