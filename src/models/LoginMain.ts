import mongoose, { Document, Model, Schema } from 'mongoose';

interface ILoginMain extends Document {
  id: string;
  password: string;
}

const LoginSchemaMain: Schema<ILoginMain> = new mongoose.Schema({
  id: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginMain: Model<ILoginMain> = mongoose.models.LoginMain || mongoose.model<ILoginMain>('LoginMain', LoginSchemaMain);

export default LoginMain;
