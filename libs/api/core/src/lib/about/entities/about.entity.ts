import { AboutInterface } from '@tfb/api-interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class About implements AboutInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  text: string;
}
