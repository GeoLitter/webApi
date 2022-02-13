import { Tag } from "./tags.interface";
import { User } from "./users.interface";

export interface Post { 
  name: string;
  description: string; 
  lat: string;
  long: string;
  postImage: string;
  avatar: string;
  user: any;
  tags: Array<Tag>;
  profile: string; 
  likes: Array<Liked>
}

interface Liked {
  user: string;
}