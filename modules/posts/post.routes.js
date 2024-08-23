import express from 'express'
import { validation } from '../../middleware/validation.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import postSchema from './post.validation.js'
import { addPost, allPosts, deletePost, specificPosts, updatePost } from './post.controller.js'

const postRoutes=express.Router()

postRoutes.post("/addPost",verifyToken,validation(postSchema),addPost)
postRoutes.put("/update/:id",verifyToken,updatePost)
postRoutes.delete("/delete/:id",verifyToken,deletePost)
postRoutes.get("/allPosts",verifyToken,allPosts)
postRoutes.get("/specificPosts",verifyToken,specificPosts)

export default postRoutes