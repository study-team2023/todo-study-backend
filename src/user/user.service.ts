import { Injectable } from '@nestjs/common';
import { UserMongoRepository } from './user.repository';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserMongoRepository) {}

  createUser(user: CreateUserDto) {
    this.userRepository.createUser(user);
  }
}
