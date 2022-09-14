import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { Result } from '../result/entities/result.entity';
import { ResultService } from '../result/result.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';

@Injectable()
export class RacesService {
  constructor(
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    private countryService: CountryService,
    @Inject(forwardRef(() => ResultService))
    private resultService: ResultService
  ) {}

  async create(createRaceDto: CreateRaceDto) {
    const race = this.raceRepository.create(createRaceDto);
    if (!race.imgNames) {
      race.imgNames = [];
    }

    const country = await this.countryService.findOne(createRaceDto.countryId);
    if (!country) {
      return new NotFoundException(
        `Country with id ${createRaceDto.countryId} was not found.}`
      );
    }
    race.country = country;

    const results: Result[] = [];
    for (let i = 0; i < createRaceDto.results.length; i++) {
      const resultDto = createRaceDto.results[i];
      try {
        const result = await this.resultService.create(resultDto);
        results.push(result);
      } catch (err: any) {
        throw new BadRequestException(err);
      }
    }
    race.results = results;

    return await this.raceRepository.save(race);
  }

  async findAll() {
    return await this.raceRepository.find({
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
  }

  findOne(id: number) {
    return this.raceRepository.findOne({
      where: { id },
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
  }

  update(id: number, updateRaceDto: UpdateRaceDto) {
    return `This action updates a #${id} race`;
  }

  remove(id: number) {
    return this.raceRepository.delete(id);
  }

  getMap() {
    throw new Error('Method not implemented.');
  }

  getYears() {
    throw new Error('Method not implemented.');
  }
  addPicture(arg0: number, filename: string) {
    throw new Error('Method not implemented.');
  }
}
