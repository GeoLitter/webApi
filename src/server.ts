import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import ProfilesRoute from './routes/profiles.route';
import PostsRoute from './routes/posts.route';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new PostsRoute(), new AuthRoute(), new ProfilesRoute()]);

app.listen();
