import mongoose, { Document, Model, Schema } from 'mongoose';

interface ITestModule extends Document {
  title: string;
  description: string;
  url: string;
  category: string;
  categoryId: string;
}

const TestModuleSchema: Schema<ITestModule> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  categoryId: { type: String, required: true },
});

const TestModule: Model<ITestModule> = mongoose.models.TestModule || mongoose.model<ITestModule>('TestModule', TestModuleSchema);

export default TestModule;
