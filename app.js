import express from 'express'
import { connection } from './DB/connection.js'
import AppError from './utili/appError.js'
import userRoutes from './modules/user/user.routes.js'
import postRoutes from './modules/posts/post.routes.js'
import commentRoutes from './modules/comments/comments.routes.js'
import likesRoutes from './modules/likes/likes.routes.js'
const app = express()
const port = 3000
app.use(express.json())
connection()
app.use("/api/v1/user",userRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/comments",commentRoutes)
app.use("/api/v1/likes",likesRoutes)




app.get('/', (req, res) => res.send('Hello World!'))
app.use("**",(req,res,next)=>{
    next(new AppError("invalid URL",404))
})
app.use((err, req, res, next) => {
    res.status(err.statusCode).send({message:err.message})
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))