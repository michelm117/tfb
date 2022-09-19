import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgeCategoryService } from '../age-category/age-category.service';
import { Race } from '../races/entities/race.entity';
import { RacesService } from '../races/races.service';
import { RidersService } from '../riders/riders.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    private riderService: RidersService,
    private ageCategoryService: AgeCategoryService,
    @Inject(forwardRef(() => RacesService))
    private raceService: RacesService
  ) {}

  async create(createResultDto: CreateResultDto) {
    const race = await this.raceService.findOne(createResultDto.raceId);
    if (!race) {
      throw new BadRequestException('Race does not exists');
    }

    const rider = await this.riderService.findOne(createResultDto.riderId);
    if (!rider) {
      throw new BadRequestException('Rider does not exists');
    }

    const ageCategory = await this.ageCategoryService.findOne(
      createResultDto.ageCategoryId
    );
    if (!ageCategory) {
      throw new BadRequestException('Age category does not exists');
    }

    const result = this.resultRepository.create(createResultDto);
    result.rider = rider;
    result.race = race;
    result.ageCategory = ageCategory;
    return await this.resultRepository.save(result);
  }

  async findAll() {
    return await this.resultRepository.find({
      relations: ['rider', 'ageCategory', 'race'],
    });
  }

  async findOne(id: number) {
    return await this.resultRepository.findOne({
      where: { id },
      relations: ['rider', 'ageCategory', 'race'],
    });
  }

  async findAllIds(ids: number[]) {
    const results: Result[] = [];

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const result = await this.findOne(id);
      if (!result) {
        continue;
      }
      results.push(result);
    }

    return results;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  async remove(id: number) {
    return await this.resultRepository.delete(id);
  }
}
