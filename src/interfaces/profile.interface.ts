import { User } from "./users.interface";

export interface Profile {
  user: User,
  location: string,
  handle: string,
  status: string,
  skills: string,
  bio: string,
  experience: [],
  education: []
  social: []
}
