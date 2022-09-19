import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RaceInterface, ResultInterface } from '@tfb/api-interfaces';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { Result } from '../result/entities/result.entity';
import { ResultService } from '../result/result.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';
import { Race } from './entities/race.entity';
import * as fs from 'fs';
import { CreateResultDto } from '../result/dto/create-result.dto';
import { DeleteResultDto } from './dto/delete-result.dto';

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
    if (createRaceDto.results) {
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
    }
    race.results = results;

    return await this.raceRepository.save(race);
  }

  async findAll() {
    return await this.raceRepository.find({
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
  }

  async findAllChecked() {
    return await this.raceRepository.find({
      where: { show: true },
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
  }

  async findOne(id: number) {
    const race = await this.raceRepository.findOne({
      where: { id },
      relations: ['country', 'results', 'results.rider', 'results.ageCategory'],
    });
    if (!race) {
      throw new NotFoundException('Race was not found');
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
    const races = await this.findAllChecked();

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

  async getMapAll() {
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

  async addResult(raceId: number, createResultDto: CreateResultDto) {
    if (!raceId || !createResultDto) {
      return;
    }

    try {
      const race = await this.raceRepository.findOne({
        where: { id: raceId },
        relations: ['results', 'results.rider', 'results.ageCategory'],
      });
      if (!race) {
        return new NotFoundException('Race was not found');
      }

      const results: Result[] = race.results;

      const result = await this.resultService.create(createResultDto);
      if (!result) {
        return new NotFoundException('Could not create result entity');
      }
      results.push(result);

      let podium = race.podium;
      if (result.acResult < 4 || result.result < 4) {
        podium = true;
      }

      return await this.raceRepository.update(raceId, {
        podium: podium,
        // results: results,
      });
    } catch (err: any) {
      console.error(err);
      throw new BadRequestException(err);
    }
  }

  async deleteResult(id: number, resultId: number) {
    if (!id || !resultId) {
      return;
    }

    try {
      await this.resultService.remove(resultId);

      // Check if  podium is still true
      const race = await this.raceRepository.findOne({
        where: { id },
        relations: ['results'],
      });
      if (!race) {
        return new NotFoundException('Race was not found');
      }

      let podium = false;
      for (let i = 0; i < race.results.length; i++) {
        const result = race.results[i];
        if (result.acResult < 4 || result.result < 4) {
          podium = true;
        }
      }

      return await this.raceRepository.update(id, { podium: podium });
    } catch (err: any) {
      console.error(err);
      throw new BadRequestException('Something went wrong');
    }
  }

  async getCalendar() {
    const records: Record<
      number,
      Record<number, Record<number, string[][]>>
    > = {};
    const map = await this.getMapAll();
    const years = Object.keys(map);

    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const races: RaceInterface[] = map[year];
      const monthDateRecord: Record<number, Record<number, string[][]>> = {};
      for (let j = 0; j < races.length; j++) {
        const race = races[j];
        if (!race) {
          continue;
        }
        const date = new Date(race.date);
        const day = date.getDate();
        const month = date.getMonth();
        if (!monthDateRecord[month]) {
          monthDateRecord[month] = {};
        }
        if (!monthDateRecord[month][day]) {
          monthDateRecord[month][day] = [];
        }
        let link = 'races/-1';
        if (race.show) {
          link = `races/${race.id}`;
        }
        monthDateRecord[month][day].push([race.title, link]);
      }
      records[year] = monthDateRecord;
    }

    return records;
  }
}
