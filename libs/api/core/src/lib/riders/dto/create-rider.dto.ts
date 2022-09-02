import { Country } from '../../country/entities/country.entity';

export class CreateRiderDto {
  public name: string;
  public surname: string;
  public country: Country;
}
