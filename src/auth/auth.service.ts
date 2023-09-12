import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.getUser(userDto.email);

    if (user) {
      throw new BadRequestException('이미 가입한 유저입니다.');
    }

    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      user.password = undefined;

      return { message: '회원가입에 성공했습니다.', user };
    } catch (error) {
      throw new InternalServerErrorException('server error');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email);

    if (!user) {
      throw new UnauthorizedException('가입하지 않은 유저입니다.');
    }

    const { password: hashedPassword, ...userInfo } = user.toObject();
    const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);

    if (isPasswordMatched) {
      return userInfo;
    }

    return null;
  }

  async refreshToken(user) {
    const payload = {
      userId: user.userId,
      username: user.username,
      admin: user.admin,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
