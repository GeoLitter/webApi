import { NextFunction, Request, Response } from 'express'; 
import { Profile } from '../interfaces/profile.interface'; 
import profileService from '../services/profiles.service';
import { check, validationResult } from 'express-validator';
import normalizeUrl from 'normalize-url';
import { RequestWithUser } from '../interfaces/auth.interface';

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

  public createProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      website,
      skills,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      // spread the rest of the fields we don't need to check
      ...rest
    } = req.body;

    // build a profile
    const profileFields = {
      user: req.user._id,
      website:
        website && website !== ''
          ? website
          : '',
      skills: Array.isArray(skills)
        ? skills
        : skills?.split(',').map((skill) => ' ' + skill.trim()),
      ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = value;
    }
    // add to profileFields
    profileFields.social = socialFields;
    try {
      const createProfileData: Profile = await this.profileService.createProfile(profileFields);
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
