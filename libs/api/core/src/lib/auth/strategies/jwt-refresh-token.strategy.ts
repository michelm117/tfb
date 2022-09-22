import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { TokenPayload } from '@tfb/api-interfaces';
import { AuthService } from '../auth.service';

/**
 * JwtRefreshTokenStrategy is used to verify if the request has an valid refresh token.
 * PassportStrategy first verifies the JWT's signature. The validate() method is
 * only called if the token is valid (not expired and signed with our secret).
 */
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token'
) {
  /**
   * The constructor extracts the refresh token from the cookie and injects the
   * needed providers.
   * @param {ConfigService} configService
   * @param {UserService} userService
   * @param {AuthService} authService
   */
  constructor(
    private userService: UserService,
    private authService: AuthService,
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      secretOrKey: configService.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  /**
   * Verify if the refresh token belongs to the user.
   *
   * Because of option passReqToCallback inside the constructor we have access
   * on the request.
   * @param req
   * @param payload
   * @returns
   */
  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.cookies?.Refresh;

    const user = await this.userService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId
    );

    if (!user) {
      req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
    }
    return user;
  }
}
