import {
  Controller,
  Get,
  Param,
  Request,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from '@tfb/api-interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

/**
 * UsersController is responsible for handling incoming user requests
 * and returning responses to the client. Only exposed properties will be send.
 * See [Expose properties]{@link https://docs.nestjs.com/techniques/serialization#expose-properties}
 */
@Controller('user')
@SerializeOptions({
  strategy: 'excludeAll',
})
export class UserController {
  /**
   * Inject needed provider.
   * @param {UsersService} usersService
   */
  constructor(private usersService: UserService) {}

  /**
   * Return the user belonging to the given jwt.
   * @param {RequestWithUser} req
   * @returns {UserInterface}
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: RequestWithUser): Promise<User> {
    return this.usersService.getById(req.user.id);
  }

  /**
   * Return the user belonging to the given id.
   * @param {number} id
   * @returns {UserInterface}
   */
  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  getProfileById(@Param('id') id: number): Promise<User> {
    return this.usersService.getById(id);
  }
}
