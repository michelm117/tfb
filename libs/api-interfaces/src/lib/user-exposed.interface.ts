export interface UserInterface {
  /**
   * User id.
   * @type {number}
   */
  id: number;

  /**
   * User email address.
   * @type {string}
   */
  email: string;

  /**
   * name.
   * @type {string}
   */
  name: string;

  /**
   * Hashed user password.
   * @type {string}
   */
  password: string;

  /**
   * Describes if account is active or not.
   * @type {boolean}
   */
  isActive: boolean;
}

export interface UserExposedInterface {
  /**
   * User email address.
   * @type {string}
   */
  email: string;

  /**
   * Name.
   * @type {string}
   */
  name: string;
}
