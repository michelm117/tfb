import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/entities/user.entity';

/**
 * LocalStrategy is used to log user in. It validates the credentials and
 * returns the authenticated user.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Define the username field in the constructor.
   * @param authService
   */
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  /**
   * Validate the credentials.
   * @param {string} username
   * @param {string} password
   * @returns  Promise<User>
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.getAuthenticatedUser(
      username,
      password
    );
    // if (!user.isActive) {
    //   throw new UnauthorizedException('User is not active');
    // }
    return user;
  }
}
