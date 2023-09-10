import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserMongoRepository } from './user.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserMongoRepository) {}

  async createUser(user: CreateUserDto) {
    const hasUser = await this.userRepository.getUser(user.email);
    if (hasUser) {
      throw new UnauthorizedException('이미 존재하는 유저입니다.');
    }

    this.userRepository.createUser(user);
  }

  async getUser(email: string) {
    return await this.userRepository.getUser(email);
  }

  updateUser(email: string, user) {
    return this.userRepository.updateUser(email, user);
  }

  deleteUser(email: string) {
    return this.userRepository.deleteUser(email);
  }
}
