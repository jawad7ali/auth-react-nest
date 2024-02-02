import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Model } from 'mongoose';
import { BaseRepository } from './abstract.repository';

@Injectable()
export class UserRepository extends BaseRepository<UserDocument> {
    constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
        super(userModel);
    }

    async createUser(user: User): Promise<User> {
        return this.model.create(user);
    }

    // Here, we can add more specific methods for the User repository if needed
}
