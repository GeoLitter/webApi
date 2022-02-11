import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';  
import { Profile } from '../interfaces/profile.interface';
import profileModel from '../models/profiles.model';
import { isEmpty } from '../utils/util';

class ProfilesService {
  public profiles = profileModel; 

  public async findAllProfiles(): Promise<Profile[]> {
    const users: Profile[] = await this.profiles.find({}, ['name', 'avatar', 'email']).populate('profiles', ['location']);
    return users;
  }

  public async findProfileById(userId: string): Promise<Profile> {
    const findUser: Profile = await this.profiles.findOne({ _id: userId }, ['name', 'avatar', 'email']);
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  // public async createProfile(userData: CreateUserDto): Promise<Profile> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: Profile = await this.profiles.findOne({ email: userData.email });
  //   if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: Profile = await this.profiles.create({ ...userData, password: hashedPassword });
  //   return createUserData;
  // }

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
