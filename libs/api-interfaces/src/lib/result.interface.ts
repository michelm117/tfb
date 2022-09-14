import { AgeCategoryInterface } from './age-category.interface';
import { RiderInterface } from './rider.interface';

export interface ResultInterface {
  id: number;
  rider: RiderInterface;
  result: number;
  ageCategory: AgeCategoryInterface;
  acResult: number;
}
