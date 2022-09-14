import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RiderInterface } from '@tfb/api-interfaces';
import { Country } from '../../country/entities/country.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Rider implements RiderInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @ManyToOne(() => Country, (country) => country.riders)
  country: Country;

  @Column({
    default: 'profile.jpg',
  })
  imgName: string;

  @OneToMany(() => Result, (result) => result.rider)
  results: Result[];
}
