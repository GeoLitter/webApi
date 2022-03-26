export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profile: Profile;
}

export interface UserBasic { 
  name: string;
  email: string; 
  profile: Profile;
}

interface Profile {
  _id: string,
  handle: string
}