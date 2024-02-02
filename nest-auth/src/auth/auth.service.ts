import { HttpException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from './schemas/user.schema';
import { IUser, IUserLogin } from '../interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) { }

  async login(userPayload: IUserLogin): Promise<any> {
    const { email, password } = userPayload;
    const user:any = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'User not found',
        },
        404,
      );
    }

    const isMatch = await this.comparePassword(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        {
          status: 400,
          error: 'Invalid credentials',
        },
        400,
      );
    }

    const token: any = await this.createToken(user._id);

    return {
      message: 'User successfully logged in',
      token,
    };

  }

  async register(user: IUser): Promise<User> {
    try {
      const { email } = user;
      const userExist = await this.userRepository.findOne({ email });

      if (userExist?.email) {
        throw new HttpException(
          {
            status: 400,
            error: 'User already exists',
          },
          400,
        );
      }

      user.password = await bcrypt.hash(user.password, 10);
      const createdUser = await this.userRepository.createUser(user);
      return createdUser;
      
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: 500,
          error: error.response?.error || 'Internal server error',
        },
        500,
      );
    }
  }

  async createToken(id: string): Promise<any> {
    const user = { id };
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }
  
  async comparePassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }

}
