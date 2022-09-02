import { CountryInterface } from '@tfb/api-interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Rider } from '../../riders/entities/rider.entity';

@Entity()
export class Country implements CountryInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iso: string;

  @OneToMany(() => Rider, (rider) => rider.country)
  riders: Rider[];
}
