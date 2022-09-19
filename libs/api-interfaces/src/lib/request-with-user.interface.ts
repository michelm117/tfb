import { Request } from 'express';
import { UserInterface } from './user-exposed.interface';

/**
 * Extend the Request with the user class.
 */
export interface RequestWithUser extends Request {
  /**
   * User that is saved in the request.
   * @type {User}
   */
  user: UserInterface;
}
