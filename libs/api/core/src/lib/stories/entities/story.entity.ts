import { StoryInterface } from '@tfb/api-interfaces';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../country/entities/country.entity';

@Entity()
export class Story implements StoryInterface {
  @PrimaryGeneratedColumn()
  id: number;

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
}
