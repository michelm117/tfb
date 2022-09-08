import { AboutInterface } from '@tfb/api-interfaces';
import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About implements AboutInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  @Expose()
  text: string;
}
