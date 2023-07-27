import mongoose from "mongoose";
import slugify from "slugify";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const dompurify = DOMPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    type: String,
  },
  markdown: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtML: {
    required: true,
    type: String,
  },
});

const options = {
  headerIds: false,
};
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdown) {
    this.sanitizedHtML = dompurify.sanitize(marked(this.markdown, options));
  }

  next();
});
export default mongoose.model("Article", articleSchema);
