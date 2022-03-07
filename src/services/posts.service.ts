import { Post } from '../interfaces/posts.interface'; 
import postModel from '../models/posts.model'; 
import HttpException from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';
import { Comment } from '../interfaces/comment.interface';

class PostsService {
  public posts = postModel;

  public async findAllPosts(): Promise<Post[]> {
    const posts: Post[] = await this.posts.find().sort({ date: -1 }).populate('profile', ['bio', 'location', 'handle']); 
    return posts;
  }

  public async findPostById(postId: string): Promise<Post> {
    const post: Post = await this.posts.findById(postId).populate('profile', ['bio', 'location', 'handle']);
    if(!post) throw new HttpException(400, "No Post Found");
    return post;
  }

  public async createPost(post: Post): Promise<Post> {
    //add validation here
    if (isEmpty(post)) throw new HttpException(400, "Not a valid post");
    const createPostData: Post = await this.posts.create({...post});
    return createPostData;
  }

 
  public async likePost(userId, postId) {
    const post = await this.posts.findById(postId);
    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === userId.toString())) {
      console.log("Post already liked");
      throw new HttpException(400, 'Post already liked');
    }
    //safe user id to likes array
    post.likes.unshift({user: userId});
    await post.save();
    return post.likes;
  }

  public async dislikePost(userId, postId) {
    const post = await this.posts.findById(postId);
    // Check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === userId.toString())) { 
      throw new HttpException(400, 'Post not liked yet');
    }
    //remove like from likes array
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== userId.toString()
    );
    await post.save();
    return post.likes;
  }

  public async deletePost(postId: String, userId: String): Promise<Post> {
    // Todo: Fix bug to only delete authorsized posts
    const findPostById: Post = await this.posts.findById(postId);    
    //check to see post belongs to authorized user
    if(findPostById.user.toString() !== userId.toString()) throw new HttpException(401, "Not Authorized to make this request");
    //if user matches delete post
    const deletePostById: Post = await this.posts.findByIdAndDelete(findPostById);
    return deletePostById; 
  }

  public async createComment(postId: string, comment: Comment) { 
    const post = await this.posts.findById(postId);
    post.comments.unshift(comment);
    await post.save();
    return post.comments;
  }
}

export default PostsService;
