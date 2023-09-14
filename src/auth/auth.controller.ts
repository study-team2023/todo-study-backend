import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Response,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Public } from './decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    return await this.authService.login({ req, res });
  }

  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('/refresh')
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('/logout')
  logout(@Response() res) {
    res.cookie('refresh', '', {
      httpOnly: true,
      expires: new Date(0), // 만료일을 과거로 설정
    });
    return res.send({ message: '로그아웃 되었습니다.' });
  }

  @Public()
  @Get('/to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Public()
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    return await this.authService.googleAuth({ req, res });
  }
}
