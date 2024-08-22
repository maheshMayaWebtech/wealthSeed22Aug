// models/BlogPost.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBlogPost extends Document {
  title: string;
  chapter: string;
  description: string;
  module1: string;
  color: string;
  image: string;
  youtubeUrl: string,
  createdAt: Date;
}

const BlogPostSchema: Schema<IBlogPost> = new mongoose.Schema({
  title: { type: String, required: true },
  chapter: { type: String, required: false },
  description: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  youtubeUrl: { type: String, required: true }
});

const BlogPost: Model<IBlogPost> = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);

export default BlogPost;
