import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { RiderInterface } from '@tfb/api-interfaces';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Rider implements RiderInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Expose()
  public name: string;

  @Column()
  @Expose()
  public surname: string;

  @Expose()
  @ManyToOne(() => Country, (country) => country.riders)
  public country: Country;

  @Column({
    default: 'https://www.alpecin-deceuninck.com/images/team/no-image-2022.jpg',
  })
  @Expose()
  public imgUrl: string;
}
