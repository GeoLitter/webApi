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
}

export default PostsService;
