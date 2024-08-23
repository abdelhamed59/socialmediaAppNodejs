import commentsModel from "../../DB/models/comments/comments.model.js"
import postModel from "../../DB/models/posts/post.model.js"
import handleError from "../../middleware/handelAsyncError.js"
import AppError from "../../utili/appError.js"

const addComment = handleError(async (req, res) => {
    let{id}=req.params
    req.body.addedBy=req.user.id
    req.body.postId=id
    const comment = await commentsModel.insertMany(req.body)
    const post= await postModel.findById({_id:id})
     post.comments.push(comment[0]._id)
     await post.save()
    res.status(201).json({ message: "comment Added", comment ,post})
})

const updateComment = handleError(async (req, res,next) => {
    let {content} = req.body;
    let{id}=req.params
    const comment = await commentsModel.findById({_id:id})
    if (comment.addedBy!=req.user.id) {
        next(new AppError( "only comment owner can update post", 401))
    } else {
        const update = await commentsModel.findByIdAndUpdate({ _id:id }, { content }, { new: true })
        res.status(200).json(update)
    }
})

const deleteComment = handleError(async (req, res,next) => {
    let{id}=req.params
    const comment = await commentsModel.findById({_id:id})
    const post=await postModel.findOne({comments:id})
    if (comment.addedBy!=req.user.id&&post.addedBy!=req.user.id) {
        next(new AppError( "only comment owner can delete this comment", 401))
    
    } else {
        const deleted = await commentsModel.findByIdAndDelete({ _id:id })
       const post= await postModel.findOneAndUpdate(
            { comments: comment._id },  
            { $pull: { comments: comment._id } },
            {new:true}  
        );
        res.status(200).json({message:"comment deleted successfuly",post})
    }

})

const allCommentsForpost = handleError(async (req, res,next) => {
    let{id}=req.params
    const comments=await commentsModel.find({postId:id}).populate("postId","title content addedBy createdAt updatedAt")
    const count=comments.length
    res.status(200).json({message:"all comments",count,comments})

})

const commentsYouWrote = handleError(async (req, res,next) => {
    const comments=await commentsModel.find({addedBy:req.user.id}).populate("postId","title content addedBy createdAt updatedAt")
    const count =comments.length
    res.status(200).json({message:"all comments you wrte",count,comments})

})

export{
    addComment,
    updateComment,
    deleteComment,
    allCommentsForpost,
    commentsYouWrote
}