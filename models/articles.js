import mongoose from "mongoose";
import slugify from "slugify";
import { marked } from "marked";

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
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    }
});

articleSchema.pre('validate', function(next) {
    if(this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }

    next();
})
export default mongoose.model('Article', articleSchema);