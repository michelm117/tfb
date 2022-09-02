import { CountryInterface } from './country.interface';

export interface RiderInterface {
  id: number;
  name: string;
  surname: string;
  country: CountryInterface;
  imgName: string;
}
