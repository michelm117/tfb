import { RaceInterface } from '@tfb/api-interfaces';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from '../../country/entities/country.entity';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class Race implements RaceInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Result, (result) => result.race)
  results: Result[];

  @Column()
  title: string;

  @Column()
  place: string;

  @ManyToOne(() => Country, (country) => country.stories)
  country: Country;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  text: string;

  @Column('simple-array', {
    nullable: true,
  })
  imgNames: string[];

  @Column({ default: false })
  podium: boolean;

  @Column({ default: false })
  show: boolean;
}
