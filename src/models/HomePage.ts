import mongoose, { Document, Model, Schema } from 'mongoose';

interface IHomePage extends Document {
  homeTitle: string;
  homeDescription: string;
  homeSubtitle: string;
  homeRightImage: string;
  mainLogo: string;
}

const HomePageSchema: Schema<IHomePage> = new mongoose.Schema({
  homeTitle: { type: String, required: false },
  homeSubtitle: { type: String, required: false },
  homeDescription: { type: String, required: false },
  homeRightImage: {type: String, required: false},
  mainLogo: {type: String, required: false}
});

const HomePage: Model<IHomePage> = mongoose.models.HomePage || mongoose.model<IHomePage>('HomePage', HomePageSchema);

export default HomePage;
