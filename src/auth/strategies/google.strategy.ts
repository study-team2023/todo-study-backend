import { Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { googleCallbackUrl } from '../constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${googleCallbackUrl}/auth/google`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, displayName, emails } = profile;

    const providerId = id;
    const email = emails[0].value;

    const user: User = await this.userService.findByEmailOrSave(
      email,
      displayName,
      providerId,
    );

    return user;
  }
}
