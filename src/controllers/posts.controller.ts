import { profile } from 'console';
import { NextFunction, Request, Response } from 'express'; 
import { RequestWithUser } from '../interfaces/auth.interface';
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

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => { 
    const post: Post = {
      text: req.body.text,
      name: req.body.name,
      lat: req.body.lat,
      long: req.body.long,
      postImage: req.body.postImage,
      avatar: req.body.avatar,
      tags: [req.body.tags[0]],
      user: req.user._id,
      profile: req.body.profile
    };
    
    try {
      const createPostData: Post = await this.postService.createPost({...post});
      res.status(200).json({data: createPostData, message: 'post created'});
    } catch (error) {
      next(error);
    }
  }

  public deletePost = async (req:RequestWithUser, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user._id; 
    try { 
      const deletePostById: Post = await this.postService.deletePost(postId, userId);
      res.status(200).json({ data: deletePostById, message: 'deleted' });
    } catch (error) { 
      next(error);
    }
  }
}


export default PostsController;
