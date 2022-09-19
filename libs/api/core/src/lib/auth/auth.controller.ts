import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  HttpCode,
  SerializeOptions,
} from '@nestjs/common';
import { RequestWithUser } from '@tfb/api-interfaces';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

/**
 * AuthController is responsible for handling incoming authentication requests
 * and returning responses to the client. Only exposed properties will be send.
 * See [Expose properties]{@link https://docs.nestjs.com/techniques/serialization#expose-properties}
 */
@Controller('auth')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class AuthController {
  /**
   * Inject authService and userService providers.
   * @param authService
   * @param userService
   */
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  /**
   * Returns the user
   * @description only there for testing. Will be replaced in the future.
   * @param {RequestWithUser} req
   * @returns {UserInterface}
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserInformation(@Req() req: RequestWithUser): User {
    const user = req.user;
    return user;
  }

  /**
   * Register route
   * @param {RegisterDto} registrationData
   * @returns {Promise<UserInterface>}
   */
  @Post('register')
  async register(@Body() registrationData: RegisterDto): Promise<User> {
    return this.authService.register(registrationData);
  }

  /**
   * Login route.
   *
   * Set cookie containing access and refresh tokens and save the refresh
   * token in the db.
   *
   * Return Http Code 200. Default Http Code on Post is 201.
   * @param {RequestWithUser} req
   * @returns {Promise<UserInterface>}
   */
  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: RequestWithUser): Promise<User> {
    const { user } = req;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithJwtRefreshToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
    return user;
  }

  /**
   * Logout route.
   *
   * Remove the refresh token in the database and remove tokens from cookie.
   * @param {RequestWithUser} req
   */
  @HttpCode(200)
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req: RequestWithUser) {
    await this.userService.removeRefreshToken(req.user.id);
    req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogout());
  }

  /**
   * Refresh route.
   *
   * Set new access token in Cookie if refresh token is valid.
   * @param {RequestWithUser} req
   * @returns {UserInterface}
   */
  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Req() req: RequestWithUser): any {
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      req.user.id
    );

    req.res.setHeader('Set-Cookie', accessTokenCookie);
    return req.user;
  }
}
