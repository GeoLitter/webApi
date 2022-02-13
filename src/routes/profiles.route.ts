import { Router } from 'express';
import ProfilesController from '../controllers/profiles.controller'; 
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import { check, oneOf } from 'express-validator';
// import validationMiddleware from '../middlewares/validation.middleware'; 
import { profileValidaton } from '../middlewares/profilevalidation.middleware';

class ProfilesRoute implements Route {
  public path = '/profiles';
  public router = Router();
  public profilesController = new ProfilesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.profilesController.getProfiles);
    this.router.get(`${this.path}/:id`, this.profilesController.getProfileById);
    this.router.post(`${this.path}`, 
    authMiddleware,  
    //ensure profile has atleast status and skills
    check('user', 'no user found').notEmpty(),
    check('website', 'Is not a valid url').isURL(),
    check('handle', 'handle is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
    check('skills', 'Skills is required').notEmpty(),
    this.profilesController.createProfile);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default ProfilesRoute;
