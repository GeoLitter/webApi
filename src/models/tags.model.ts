import { model, Schema, Document } from 'mongoose';
import { Tag } from '../interfaces/tags.interface';

const tagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const tagModel = model<Tag & Document>('tag', tagSchema);

export default tagModel;
