import { Post } from '../interfaces/posts.interface'; 
import postModel from '../models/posts.model'; 
import HttpException from '../exceptions/HttpException';
import { isEmpty } from '../utils/util';

class PostsService {
  public posts = postModel;

  public async findAllPosts(): Promise<Post[]> {
    const posts: Post[] = await this.posts.find();
    return posts;
  }

  public async createPost(post: Post): Promise<Post> {
    //add validation here
    if (isEmpty(post)) throw new HttpException(400, "Not a valid post");
    const createPostData: Post = await this.posts.create({...post});
    return createPostData;
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
}

export default PostsService;
