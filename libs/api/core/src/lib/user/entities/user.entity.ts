import {
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { UserInterface } from '@tfb/api-interfaces';

/**
 * User class representing a user entity.
 */
@Entity()
@Unique(['email'])
export class User implements UserInterface {
  /**
   * Generated primary key.
   * @type {number}
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * Email is a primary key and needs to be unique.
   * @type {string}
   */
  @PrimaryColumn()
  @Expose()
  public email: string;

  /**
   * name.
   * @type {string}
   */
  @Column()
  @Expose()
  public name: string;

  /**
   * Hashed user password. Should not be exposed. See:
   * [Expose properties]{@link https://docs.nestjs.com/techniques/serialization#expose-properties}
   * @type {string}
   */
  @Column()
  public password: string;

  /**
   * Entity status.
   * @type {boolean}
   */
  @Column({ default: false })
  public isActive: boolean;

  /**
   * Current refresh token. Needs to be deleted on logout or password change.
   *
   * ToDo: Temporary solution. Hashed Token needs to be stored in an in memory
   * database. See: [redis]{@link https://redis.io/}.
   * @type {string}
   */
  @Column({
    nullable: true,
  })
  @Exclude()
  public currentHashedRefreshToken?: string;
}
