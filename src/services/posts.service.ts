import { Post } from '../interfaces/posts.interface'; 
import postModel from '../models/posts.model'; 

class PostsService {
  public posts = postModel;

  public async findAllPosts(): Promise<Post[]> {
    const posts: Post[] = await this.posts.find();
    return posts;
  }
}

export default PostsService;
