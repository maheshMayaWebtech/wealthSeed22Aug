import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITestCategory extends Document {
  category: string;
  description: string;
}

const TestCategorySchema: Schema<ITestCategory> = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true }
});

const TestCategory: Model<ITestCategory> = mongoose.models.TestCategory || mongoose.model<ITestCategory>('TestCategory', TestCategorySchema);

export default TestCategory;
