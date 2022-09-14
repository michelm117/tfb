import { CreateResultDto } from '../../result/dto/create-result.dto';

export class CreateRaceDto {
  title: string;
  place: string;
  countryId: number;
  results: CreateResultDto[];
  date: Date;
  text: string;
  imgNames: string[];
}
