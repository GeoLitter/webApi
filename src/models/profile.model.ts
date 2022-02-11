import { model, Schema, Document } from 'mongoose';
import { Profile } from '../interfaces/profile.interface'; 

const profileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String
  }, 
  date: {
    type: Date,
    default: Date.now
  }
});

const profileModel = model<Profile & Document>('Profile', profileSchema);

export default profileModel;
