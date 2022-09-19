import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * UsersService is responsible for interacting with the user database.
 */
@Injectable()
export class UserService {
  /**
   * Inject needed provider.
   * @param {Repository<UserInterface>} usersRepository
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  /**
   * Find user with the given email.
   * @param {string} email
   * @returns {Promise<UserInterface>}
   */
  async getByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  /**
   * Find user with the given id.
   * @param {number} id
   * @returns {Promise<UserInterface>}
   */
  async getById(id: number): Promise<User> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Create a user with the given properties.
   * @param {CreateUserDto} userData
   * @returns {Promise<UserInterface>}
   */
  async create(userData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  /**
   * Save the given refresh token in the database
   * @param {string} refreshToken
   * @param {number} userId
   */
  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(
      { id: userId },
      {
        currentHashedRefreshToken,
      }
    );
  }

  /**
   * Remove the given user's refresh token.
   * @param {number} userId
   * @returns {Promise<UpdateResult>}
   */
  async removeRefreshToken(userId: number): Promise<UpdateResult> {
    return this.usersRepository.update(
      { id: userId },
      {
        currentHashedRefreshToken: null,
      }
    );
  }

  /**
   * Verify whether the saved refresh token of the user with the given id
   * matches the given refresh token.
   * @param {string} refreshToken
   * @param {number} userId
   * @returns {Promise<UserInterface>}
   */
  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number
  ): Promise<User> {
    const user = await this.getById(userId);
    if (!user) {
      throw new HttpException(
        `User with id ${userId} does not exists`,
        HttpStatus.BAD_REQUEST
      );
    }

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
