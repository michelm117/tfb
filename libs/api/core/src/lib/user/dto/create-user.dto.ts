/**
 * CreateUserDto defines which properties are needed to create a new user.
 */
export class CreateUserDto {
  /**
   * User email
   * @type {string}
   */
  email: string;

  /**
   * Name
   * @type {string}
   */
  name: string;

  /**
   * User password
   * @type {string}
   */
  password: string;
}
