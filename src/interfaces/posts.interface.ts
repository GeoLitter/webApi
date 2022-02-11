import { Tag } from "./tags.interface";

export interface Post { 
  text: string;
  name: string; 
  lat: string;
  long: string;
  postImage: string;
  avatar: string;
  user: any;
  tags: Array<Tag>;
  profile: string;
}