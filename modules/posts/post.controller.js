import postModel from "../../DB/models/posts/post.model.js"
import handleError from "../../middleware/handelAsyncError.js"
import AppError from "../../utili/appError.js"

const addPost = handleError(async (req, res) => {
    req.body.addedBy=req.user.id
    const post = await postModel.insertMany(req.body)
    res.status(201).json({ message: "post Added", post })
})

const updatePost = handleError(async (req, res,next) => {
    let { title,content,status} = req.body;
    let{id}=req.params
    const post = await postModel.findOne({_id:id})
    if (post.addedBy!=req.user.id) {
        next(new AppError( "only post owner can update post", 401))
    } else {
        const update = await postModel.findByIdAndUpdate({ _id:id }, { title,content,status }, { new: true })
        res.status(200).json(update)
    }
})

const deletePost = handleError(async (req, res,next) => {
    let{id}=req.params
    const post = await postModel.findOne({_id:id})
    if (post.addedBy!=req.user.id) {
        next(new AppError( "only post owner can delete post", 401))
    } else {
        const update = await postModel.findByIdAndDelete({ _id:id })
        res.status(200).json({message:"post deleted successfuly"})
    }
})

const allPosts = handleError(async (req, res,next) => {
    const posts=await postModel.find({status:"public"}).populate("comments","addedBy content").populate("likes","addedBy createdAt")
    const count= posts.length
    res.status(200).json({message:"all posts",count,posts})

})

const specificPosts = handleError(async (req, res,next) => {
    const posts=await postModel.find({addedBy:req.user.id}).populate("comments","addedBy content").populate("likes","addedBy createdAt")
    const count=posts.length
    res.status(200).json({message:"all posts",count,posts})

})

export{
    addPost,
    updatePost,
    deletePost,
    allPosts,
    specificPosts
}