import express from 'express'
import { validation } from '../../middleware/validation.js'
import { verifyToken } from '../../middleware/verifyToken.js'
import likesSchema from './likes.validation.js'
import { addLike, deleteLike } from './likes.controller.js'

const likesRoutes=express.Router()

likesRoutes.post("/addLike/:id",verifyToken,validation(likesSchema),addLike)
likesRoutes.delete("/removeLike/:id",verifyToken,deleteLike)


export default likesRoutes