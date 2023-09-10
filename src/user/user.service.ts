import { Injectable } from '@nestjs/common';
import { UserMongoRepository } from './user.repository';
import { CreateUserDto } from './user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserMongoRepository) {}

  createUser(user: CreateUserDto) {
    this.userRepository.createUser(user);
  }

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }

  updateUser(email: string, user: User) {
    return this.userRepository.updateUser(email, user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
