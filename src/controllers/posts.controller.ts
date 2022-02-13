import { NextFunction, Request, Response } from 'express'; 
import { validationResult } from 'express-validator';
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const post: Post = {
      name: req.body.name,
      description: req.body.description,
      lat: req.body.lat,
      long: req.body.long,
      postImage: req.body.postImage,
      avatar: req.body.avatar,
      tags: [req.body.tags[0]],
      user: req.user._id,
      profile: req.body.profile,
      likes: []
    };
    
    try {
      const createPostData: Post = await this.postService.createPost({...post});
      res.status(200).json({data: createPostData, message: 'post created'});
    } catch (error) {
      next(error);
    }
  }

  public likePost = async (req:RequestWithUser, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    const userId = req.user._id; 
    try {
      const likedPost = await this.postService.likePost(userId, postId);
      res.status(200).json({
        data: likedPost, message: "Post is liked"
      })
    } catch (error) { 
      next(error)
    }
  }


  public unlikePost = async (req:RequestWithUser, res: Response, next: NextFunction) => {
    return res.status(200).json({
      "message": `DisLiked Post ${req.params.id}`
    });
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
