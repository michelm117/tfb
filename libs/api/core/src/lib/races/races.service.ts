import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceInterface } from '@tfb/api-interfaces';
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
    race.podium = false;

    const results: Result[] = [];
    for (let i = 0; i < createRaceDto.results.length; i++) {
      const resultDto = createRaceDto.results[i];
      try {
        const result = await this.resultService.create(resultDto);
        if (result.acResult < 4 || result.result < 4) {
          race.podium = true;
        }
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

  async getMap() {
    const races = await this.findAll();

    const map: Record<number, RaceInterface[]> = {};
    for (const race of races) {
      const year = new Date(race.date).getFullYear();
      if (!map[year]) {
        map[year] = [];
      }
      map[year].push(race);
    }
    return map;
  }

  async getYears() {
    const map = await this.getMap();
    return Object.keys(map);
  }

  addPicture(arg0: number, filename: string) {
    throw new Error('Method not implemented.');
  }
}
