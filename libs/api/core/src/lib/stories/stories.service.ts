import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryInterface } from '@tfb/api-interfaces';
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
    if (!story.imgNames) {
      story.imgNames = [];
    }
    return await this.storiesRepository.save(story);
  }

  async findAll() {
    return await this.storiesRepository.find({ relations: ['country'] });
  }

  async getMap() {
    const stories = await this.findAll();

    const map: Record<number, StoryInterface[]> = {};
    for (const story of stories) {
      const year = new Date(story.date).getFullYear();
      if (!map[year]) {
        map[year] = [];
      }
      map[year].push(story);
    }
    return map;
  }

  async getYears() {
    const map = await this.getMap();
    return Object.keys(map);
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

  async addPicture(id: number, filename: string) {
    const rider = await this.storiesRepository.findOneBy({ id });
    if (!rider) {
      return;
    }

    // Adding new image to array
    let images = rider.imgNames;
    if (!images) {
      images = [];
    }
    images.push(filename);
    return await this.storiesRepository.update(id, { imgNames: images });
  }

  async deletePicture(filename: string) {
    console.log('Delete');
  }
}
