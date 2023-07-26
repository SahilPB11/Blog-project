import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{
        required: true,
        type: String,
    },description:{
        type:String,
    },markdown:{
        required: true,
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});
export default mongoose.model('Article', articleSchema);