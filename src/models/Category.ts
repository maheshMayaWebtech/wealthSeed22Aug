import mongoose, { Document, Model, Schema } from 'mongoose';

interface ICategory extends Document {
  category: string;
  description: string;
}

const CategorySchema: Schema<ICategory> = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true }
});

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
