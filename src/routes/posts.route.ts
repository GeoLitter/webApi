import { Router } from 'express';
import PostsController from '../controllers/posts.controller'; 
import Route from '../interfaces/routes.interface'; 

class PostsRoute implements Route {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.postsController.getPosts);
    // this.router.get(`${this.path}/:id`, this.postsController.getUserById);
    // this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.postsController.createUser);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.postsController.updateUser);
    // this.router.delete(`${this.path}/:id`, this.postsController.deleteUser);
  }
}

export default PostsRoute;
