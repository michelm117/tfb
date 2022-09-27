import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

/**
 * RegisterDto defines which properties are needed to register a new user.
 */
export class RegisterDto {
  /**
   * User email - needs to be a valid email address.
   * @type {string}
   */
  @IsEmail()
  email: string;

  /**
   * User password - needs to be a string with a min length of 8.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  /**
   * Name - needs to be a string that is not empty.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Key - string that needs to match secret in env file.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  key: string;
}
