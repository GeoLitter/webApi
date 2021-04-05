import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RefreshToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';

class AuthService {
  public users = userModel;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string, findUser: User, tokenData: TokenData, refreshToken: RefreshToken}> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);
    const refreshToken = this.createRefreshToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser, tokenData, refreshToken };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    //todo: delete refresh token from database
    const findUser: User = await this.users.findOne({ password: userData.password });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async refreshToken(refreshToken) {
    const secret: string = process.env.REFRESH_TOKEN; 
    const data = jwt.verify(refreshToken, secret, (error, user ) => { 
        if(error) throw new HttpException(401, "Not a valid refreshToken");
       return this.createToken(user);
    }); 

    return data;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = process.env.JWT_SECRET;
    const expiresIn: number = 30;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) };
  }

  public createRefreshToken(user: User): RefreshToken {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secret: string = process.env.REFRESH_TOKEN; 
    return { token: jwt.sign(dataStoredInToken, secret) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
