import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';  
import { Profile } from '../interfaces/profile.interface';
import profileModel from '../models/profiles.model';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class ProfilesService {
  public profiles = profileModel;  

  public async findAllProfiles(): Promise<Profile[]> {
    const users: Profile[] = await this.profiles.find({}).populate('user', ['name', 'email', 'avatar']);
    return users;
  }

  public async findProfileById(userId: string): Promise<Profile> {
    const findUser: Profile = await this.profiles.findOne({ _id: userId }).populate('user', ['name', 'email', 'avatar']);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createProfile(profileData): Promise<Profile> { 
    if (isEmpty(profileData)) throw new HttpException(400, "No Profile Data Provided");
    console.log(profileData)
    let profile = await this.profiles.findOneAndUpdate(
      { user: profileData.user},
      { $set: profileData},
      { new: true, upsert: true, setDefaultsOnInsert: true })
    return profile;
  }

  // public async updateProfile(userId: string, userData: Profile): Promise<Profile> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const updateUserById: Profile = {};
  //   if (!updateUserById) throw new HttpException(409, "You're not user");

  //   return updateUserById;
  // }

  // public async deleteProfileData(userId: string): Promise<Profile> {
  //   const deleteUserById: Profile = await this.profiles.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");

  //   return deleteUserById;
  // }
}

export default ProfilesService;
