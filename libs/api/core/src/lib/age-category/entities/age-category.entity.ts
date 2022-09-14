import { AgeCategoryInterface } from '@tfb/api-interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Result } from '../../result/entities/result.entity';

@Entity()
export class AgeCategory implements AgeCategoryInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Result, (result) => result.ageCategory)
  results: Result[];
}
