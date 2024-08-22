import mongoose, { Document, Model, Schema } from 'mongoose';

interface IModule extends Document {
  title: string;
  description: string;
  content: string;
  category: string;
  categoryId: string,
  createdAt: Date;
  image: string;
}

const ModuleSchema: Schema<IModule> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  categoryId: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Module: Model<IModule> = mongoose.models.Module || mongoose.model<IModule>('Module', ModuleSchema);

export default Module;
