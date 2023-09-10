import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

export interface UserRepository {
  createUser(user: CreateUserDto);
  getUser(email: string);
  updateUser(email: string, _user: User);
  deleteUser(email: string);
}

@Injectable()
export class UserMongoRepository implements UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  createUser(user: CreateUserDto): Promise<User> {
    const createUser = {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.userModel.create(createUser);
  }

  async getUser(email: string): Promise<User> {
    const result = await this.userModel.findOne({ email }).exec();
    return result;
  }

  updateUser(email: string, _user: User): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { email },
      { $set: { ..._user, updatedAt: new Date() } },
      { new: true },
    );
  }

  deleteUser(email: string) {
    return this.userModel.deleteOne({ email });
  }
}
