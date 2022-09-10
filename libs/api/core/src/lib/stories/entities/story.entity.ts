import { StoryInterface } from '@tfb/api-interfaces';
import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Story implements StoryInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column()
  title: string;

  @Expose()
  @Column()
  place: string;

  @Expose()
  @ManyToOne(() => Country, (country) => country.stories)
  country: Country;

  @Expose()
  @Column({ type: 'date' })
  date: Date;

  @Expose()
  @Column()
  text: string;

  @Expose()
  @Column('simple-array', {
    nullable: true,
  })
  imgNames: string[];

  @Expose()
  @Column({ default: false })
  podium: boolean;
}
