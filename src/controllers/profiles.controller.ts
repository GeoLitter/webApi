import { NextFunction, Request, Response } from 'express'; 
import { Profile } from '../interfaces/profile.interface'; 
import profileService from '../services/profiles.service';

class ProfilesController {
  public profileService = new profileService();

  public getProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Profile[] = await this.profileService.findAllProfiles();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProfileById = async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;

    try {
      const findOneUserData: Profile = await this.profileService.findProfileById(userId);
      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { user, location, bio, handle } = req.body as Profile; 
    const profileData = {
      userid: req.user.id,
      user: user,
      location: location,
      bio: bio,
      handle: handle
    }
    try {
      const createProfileData: Profile = await this.profileService.createProfile(profileData);
      res.status(201).json({ data: createProfileData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  // public updateUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId: string = req.params.id;
  //   const userData: User = req.body;

  //   try {
  //     const updateUserData: User = await this.userService.updateUser(userId, userData);
  //     res.status(200).json({ data: updateUserData, message: 'updated' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userId: string = req.params.id;

  //   try {
  //     const deleteUserData: User = await this.userService.deleteUserData(userId);
  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}

export default ProfilesController;
