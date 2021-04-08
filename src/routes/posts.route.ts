import { Router } from 'express';
import PostsController from '../controllers/posts.controller'; 
import Route from '../interfaces/routes.interface'; 
import authMiddleware from '../middlewares/auth.middleware';

class PostsRoute implements Route {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.postsController.getPosts);
    // this.router.get(`${this.path}/:id`, this.postsController.getUserById);
    this.router.post(`${this.path}`, authMiddleware, this.postsController.createPost);
    // this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDto, 'body', true), this.postsController.updateUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.postsController.deletePost);
  }
}

export default PostsRoute;
