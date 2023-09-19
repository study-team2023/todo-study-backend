import { IsEmail, IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '유저 이름' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '비밀번호' })
  password?: string;

  @IsString()
  @IsOptional()
  providerId?: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  providerId?: string;
}
