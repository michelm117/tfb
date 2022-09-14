import { ResultInterface } from '@tfb/api-interfaces';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Rider } from '../../riders/entities/rider.entity';
import { AgeCategory } from '../../age-category/entities/age-category.entity';
import { Race } from '../../races/entities/race.entity';

@Entity()
export class Result implements ResultInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rider, (rider) => rider.results)
  rider: Rider;

  @Column()
  result: number;

  @ManyToOne(() => AgeCategory, (ageCategory) => ageCategory.results)
  ageCategory: AgeCategory;

  @Column()
  acResult: number;

  @ManyToOne(() => Race, (race) => race.results, { onDelete: 'CASCADE' })
  @JoinColumn()
  race: Race;
}
