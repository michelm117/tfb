import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { TokenPayload } from '@tfb/api-interfaces';

/**
 * AuthService is responsible for registering and authenticating users, creating
 * cookies and verifying passwords.
 */
@Injectable()
export class AuthService {
  /**
   * Inject needed providers.
   * @param {UserService} usersService
   * @param {JwtService} jwtService
   * @param {ConfigService} configService
   */
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  /**
   * Register a user.
   * - Hashed password is stored in the database.
   * - Email must not exists in the database.
   * @param {RegisterDto} registrationData defines needed properties.
   * @returns {Promise<UserInterface>}
   */
  public async register(registrationData: RegisterDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      return createdUser;
    } catch (error) {
      if (error?.code === '23505') {
        // Postgres error code for unique key violation.
        throw new HttpException(
          'A user with this email already exists. Use a different email.',
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Validate credentials and returns authenticated user.
   * @param {string} email user email address.
   * @param {string} plainPassword plain user password.
   * @throws {HttpException} Error should not be too explicit to prevent attackers from creating list of registered emails.
   * @returns {Promise<UserInterface>} the authenticated user.
   */
  async getAuthenticatedUser(
    email: string,
    plainPassword: string
  ): Promise<User> {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }

    await this.verifyPassword(plainPassword, user.password);
    return user;
  }

  /**
   * Verify given passwords.
   * @param {string} plainPassword plain password.
   * @param {string} hashedPassword hashed password.
   * @throws {HttpException} Password must match.
   */
  private async verifyPassword(plainPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  /**
   * Creates Cookie with jwt access token.
   * ToDo: Fidel with Domain, HttpOnly and Path properties.
   * @param {number} userId
   * @returns {string} cookie with access token.
   */
  public getCookieWithJwtAccessToken(userId: number): string {
    const key = 'Authentication';
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME'
      )}s`,
    });
    const maxAge = this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME');
    const domain = 'michel.lu';
    const path = '/';
    const sameSite = 'LAX';

    const cookie = `${key}=${token};Path=${path}; Max-Age=${maxAge}; Domain=${domain}; SameSite=${sameSite}; Secure; HttpOnly`;
    return cookie;
  }

  /**
   * Creates Cookie with jwt refresh token.
   * ToDo: Fidel with Domain, HttpOnly and Path properties.
   * @param {number} userId
   * @returns {string} cookie with refresh token.
   */
  public getCookieWithJwtRefreshToken(userId: number) {
    const key = 'Refresh';

    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME'
      )}s`,
    });
    const maxAge = this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
    const domain = 'michel.lu';
    const path = '/';
    const sameSite = 'LAX';

    const cookie = `${key}=${token}; Path=${path}; Max-Age=${maxAge}; Domain=${domain}; SameSite=${sameSite}; Secure; HttpOnly`;

    return {
      cookie,
      token,
    };
  }

  /**
   * Creates Cookie with empty jwt access and refresh token. This cookie should
   * overwrite the old cookie.
   *
   * ! To overwrite the old cookie the domain and path properties must be the
   * ! same ass the original cookie.
   * @returns {string} cookie with empty access and refresh token.
   */
  public getCookiesForLogout() {
    const domain = 'michel.lu';
    const path = '/';
    const sameSite = 'LAX';

    return [
      `Authentication=; Path=${path}; Max-Age=0; Domain=${domain}; SameSite=${sameSite}; Secure; HttpOnly`,
      `Refresh=; Path=${path}; Max-Age=0; Domain=${domain}; SameSite=${sameSite}; Secure; HttpOnly`,
    ];
  }
}
