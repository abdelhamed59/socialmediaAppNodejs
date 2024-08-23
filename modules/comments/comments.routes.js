import express from 'express'
import { validation } from '../../middleware/validation.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import commentSchema from './comments.validation.js'
import { addComment, allCommentsForpost, commentsYouWrote, deleteComment, updateComment } from './comments.controller.js'

const commentRoutes=express.Router()

commentRoutes.post("/addComment/:id",verifyToken,validation(commentSchema),addComment)
commentRoutes.put("/updateComment/:id",verifyToken,updateComment)
commentRoutes.delete("/deleteComment/:id",verifyToken,deleteComment)
commentRoutes.get("/allComments/:id",verifyToken,allCommentsForpost)
commentRoutes.get("/commetsYouWrote",verifyToken,commentsYouWrote)

export default commentRoutes