import { EventInterface } from './event.interface';
import { ResultInterface } from './result.interface';

export interface RaceInterface extends EventInterface {
  id: number;
  results: ResultInterface[];
}
