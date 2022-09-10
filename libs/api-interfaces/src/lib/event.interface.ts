import { CountryInterface } from './country.interface';

export interface EventInterface {
  id: number;
  title: string;
  place: string;
  country: CountryInterface;
  date: Date;
  text: string;
  imgNames: string[];
  podium: boolean;
}
