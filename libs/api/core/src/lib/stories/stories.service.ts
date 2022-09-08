import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { Rider } from '../riders/entities/rider.entity';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storiesRepository: Repository<Story>,
    private countryService: CountryService
  ) {}

  async create(createStoryDto: CreateStoryDto) {
    const story = this.storiesRepository.create(createStoryDto);
    return await this.storiesRepository.save(story);
  }

  async findAll() {
    return await this.storiesRepository.find({ relations: ['country'] });
  }

  async findOne(id: number) {
    const story = await this.storiesRepository.findOne({
      where: { id },
      relations: ['country'],
    });
    if (!story) {
      return new NotFoundException();
    }
    return story;
  }

  async update(id: number, updateStoryDto: UpdateStoryDto) {
    const story = await this.storiesRepository.findOneBy({ id });
    if (!story) {
      return;
    }
    const country = updateStoryDto.country;
    if (country) {
      const countryEntity = await this.countryService.findOne(country.id);
      if (!countryEntity) {
        return;
      }
      story.country = countryEntity;
    }
    const newStory = { ...story, ...updateStoryDto };
    return await this.storiesRepository.update(id, newStory);
  }

  async remove(id: number) {
    return await this.storiesRepository.delete({ id });
  }
}
