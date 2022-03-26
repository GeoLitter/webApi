import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto { 
  public name: string

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
  public profile: Profile;
}

interface Profile {
  id: string,
  profile: string
}