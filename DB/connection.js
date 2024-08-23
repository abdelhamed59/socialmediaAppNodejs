import mongoose from 'mongoose'
export const connection=()=>{
    mongoose.connect('mongodb://localhost:27017/socialMediaApp').then(()=>{
        console.log("connect to mongodb")
    }).catch((err)=>{
        console.log(err);
    })
}