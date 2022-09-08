import { Country } from '../../country/entities/country.entity';

export class CreateStoryDto {
  title: string;
  place: string;
  country: Country;
  date: Date;
  text: string;
  imgNames: string[];
}
