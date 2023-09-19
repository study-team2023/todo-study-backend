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
import {
  ApiTags,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiBody,
  ApiHeader,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/register')
  @ApiOperation({ summary: '회원가입 API', description: '회원가입 한다.' })
  @ApiBody({
    schema: {
      example: {
        username: '아무거나',
        password: 'test1234',
        email: 'test@test.net',
      },
    },
  })
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  @ApiOperation({ summary: '로그인 API', description: '로그인 한다.' })
  @ApiBody({
    schema: {
      example: {
        email: 'test@test.net',
        password: 'test1234',
      },
    },
  })
  async login(@Request() req, @Response() res) {
    return await this.authService.login({ req, res });
  }

  @ApiBearerAuth()
  @Get('/profile')
  @ApiOperation({
    summary: '프로필 API',
    description:
      '유저 정보를 알 수 있다. 발급받은 토큰을 Authorization Bearer를 통해 전달해야 한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer <access_token>',
    required: true,
  })
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @Post('/refresh')
  @ApiOperation({
    summary: '리프레쉬 토큰 API',
    description: '리프레쉬 토큰이 살아있을 경우 액세스 토큰을 재발급 해준다.',
  })
  @ApiHeader({
    name: 'credentials | withCredentials',
    description: 'fetch인 경우 credentials | axios인 경우 withCredentials',
    required: true,
  })
  async refreshToken(@Request() req) {
    return await this.authService.refreshToken(req.user);
  }

  @Post('/logout')
  @ApiOperation({ summary: '로그아웃 API', description: '로그아웃 한다.' })
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
  @ApiOperation({
    summary: '구글로그인 API',
    description: '해당 api는 데이터 패칭이 아닌 a태그로 이동하는데 사용한다.',
  })
  @ApiParam({
    name: 'url',
    description:
      '예시 : http://localhost:4000/auth/to-google 형태로 a링크를 사용한다.(배포했을 경우: localhost가 아닌 실제주소 입력)',
    required: true,
  })
  async googleAuth(@Request() req) {}

  @ApiExcludeEndpoint()
  @Public()
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    return await this.authService.googleAuth({ req, res });
  }
}
