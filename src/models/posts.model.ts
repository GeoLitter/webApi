import { model, Schema, Document } from 'mongoose';
import { Post } from '../interfaces/posts.interface';  

const postSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }, 
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profile'
  },
  name: {
    type: String,
    required: true,
  }, 
  description: {
    type: String,
    required: true
  },
  postImage: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  // todo: get avatar from profile
  avatar: {
    type: String
  },
  tags: [
    {
      tag: {
        type: Schema.Types.ObjectId,
        ref: 'tags'
      }
    }
  ],
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

const postModel = model<Post & Document>('post', postSchema);

export default postModel;
