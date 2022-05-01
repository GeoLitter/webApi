import { NextFunction, Request, Response } from 'express'; 
import { validationResult } from 'express-validator';
import { RequestWithUser } from '../interfaces/auth.interface';
import { Comment } from '../interfaces/comment.interface';
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

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.id;
    try {
      const post: Post = await this.postService.findPostById(postId)
      return res.status(200).json({
        data: post, message: "Post Found"
      })
    } catch (error) {
      next(error);
    }
  }

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => { 
    const errors = validationResult(req.body);
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
      likes: [],
      comments: []
    };
    
    try {
      const createPostData: Post = await this.postService.createPost({...post});
      res.status(200).json({data: createPostData, message: 'post created'});
      res.status(200).json({data: post, message: "Got data"})
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
    const postId = req.params.id;
    const userId = req.user._id; 
    try {
      const dislikedPost = await this.postService.dislikePost(userId, postId);
      res.status(200).json({
        data: dislikedPost, message: "Post is disliked"
      })
    } catch (error) { 
      next(error)
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

  public createComment = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const postId = req.params.id;
      const userId = req.user._id; 

      const newComment: Comment = { 
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user._id
      };
      const comment = await this.postService.createComment(postId, newComment);
      res.status(200).json({data: comment, message: 'Comment created Successfully'})
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}


export default PostsController;
