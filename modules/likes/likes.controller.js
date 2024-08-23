import likesModel from "../../DB/models/likes/likes.model.js"
import postModel from "../../DB/models/posts/post.model.js"
import handleError from "../../middleware/handelAsyncError.js"



const addLike = handleError(async (req, res) => {
    let{id}=req.params
    req.body.addedBy=req.user.id
    req.body.postId=id
    const like = await likesModel.insertMany(req.body)
    const post= await postModel.findById({_id:id})
     post.likes.push(like[0]._id)
     await post.save()
    res.status(201).json({ message: "like Added", like ,post})
})

const deleteLike = handleError(async (req, res,next) => {
    let{id}=req.params
    const like = await likesModel.findById({_id:id})
    // const post=await postModel.findOne({likes:id})
    if (like.addedBy!=req.user.id) {
        next(new AppError( "only like owner can delete this like", 401))
    
    } else {
        const deleted = await likesModel.findByIdAndDelete({ _id:id })
       const post= await postModel.findOneAndUpdate(
            { likes: like._id },  
            { $pull: { likes: like._id } },
            {new:true}  
        );
        res.status(200).json({message:"like remove successfuly",post})
    }

})

export{
    addLike,
    deleteLike
}