import { Router } from 'express';
import { check } from 'express-validator';
import PostsController from '../controllers/posts.controller'; 
import Route from '../interfaces/routes.interface'; 
import authMiddleware from '../middlewares/auth.middleware';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

class PostsRoute implements Route {
  public path = '/posts';
  public router = Router();
  public postsController = new PostsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.postsController.getPosts);
    this.router.get(`${this.path}/:id`, authMiddleware, this.postsController.getPostById);
    this.router.post(`${this.path}`, 
    check('name', 'Please provide a name').notEmpty(),
    check('description', 'Please provide a description').notEmpty(),
    check('lat', 'Please ensusre location is turned on').notEmpty(),
    check('long', 'Please make sure location is turned on').notEmpty(),
    check('postImage', 'Invalid image url').isURL(),
    upload.single('image'),
    authMiddleware, this.postsController.createPost);
    this.router.put(`${this.path}/like/:id`, authMiddleware, this.postsController.likePost);
    this.router.put(`${this.path}/unlike/:id`, authMiddleware, this.postsController.unlikePost);
    this.router.delete(`${this.path}/:id`, authMiddleware, this.postsController.deletePost);
    this.router.post(`${this.path}/comment/:id`, 
    check('text', 'Text is required').notEmpty(),
    authMiddleware, this.postsController.createComment);
  }
}

export default PostsRoute;
