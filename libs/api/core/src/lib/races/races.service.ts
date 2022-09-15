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
import * as fs from 'fs';

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

  async findOne(id: number) {
    const race = await this.raceRepository.findOne({
      where: { id },
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
    if (!race) {
      return new NotFoundException('Race was not found');
    }
    return race;
  }

  async update(id: number, updateRaceDto: UpdateRaceDto) {
    const race = await this.raceRepository.findOneBy({ id });
    if (!race) {
      return;
    }

    if (updateRaceDto.countryId) {
      const countryEntity = await this.countryService.findOne(
        updateRaceDto.countryId
      );
      if (!countryEntity) {
        throw new BadRequestException('Country nof found');
      }
      race.country = countryEntity;
    }

    // Remove deleted images
    if (updateRaceDto.imgNames) {
      const diff = race.imgNames.filter((item) => {
        if (updateRaceDto.imgNames) {
          return updateRaceDto.imgNames.indexOf(item) < 0;
        }
      });
      this.deletePictures(diff);
    }

    const newRace = { ...race, ...updateRaceDto };
    await this.raceRepository.update(id, newRace);
    return newRace;
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

  async addPicture(id: number, filename: string) {
    const story = await this.raceRepository.findOneBy({ id });
    if (!story) {
      return;
    }

    // Adding new image to array
    let images = story.imgNames;
    if (!images) {
      images = [];
    }
    images.push(filename);
    return await this.raceRepository.update(id, { imgNames: images });
  }

  async deletePictures(filenames: string[]) {
    filenames.forEach((filename) => {
      this.deletePicture(filename);
    });
  }

  async deletePicture(filename: string) {
    const path = './upload/races';
    fs.unlink(`${path}/${filename}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
}
