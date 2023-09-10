import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

export interface UserRepository {
  createUser(user: CreateUserDto);
}

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(user: CreateUserDto) {
    const createUser = {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.userModel.create(createUser);
  }

  async getUser(email: string) {
    const result = await this.userModel.findOne({ email }).exec();

    return result;
  }
}
