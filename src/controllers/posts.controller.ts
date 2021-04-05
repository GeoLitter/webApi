import { NextFunction, Request, Response } from 'express'; 
import { Post } from '../interfaces/posts.interface';
import PostService from '../services/posts.service';

class PostsController {
  public postService = new PostService();

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllPostsData: Post[] = await this.postService.findAllPosts();
      res.status(200).json({ data: findAllPostsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };
}

export default PostsController;
