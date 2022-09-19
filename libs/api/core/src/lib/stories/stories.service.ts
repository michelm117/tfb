import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryInterface } from '@tfb/api-interfaces';
import { Repository } from 'typeorm';
import { CountryService } from '../country/country.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';
import * as fs from 'fs';

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

  async findAllChecked() {
    return await this.storiesRepository.find({
      where: { show: true },
      relations: ['country'],
    });
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

    // Remove deleted images
    if (updateStoryDto.imgNames) {
      const diff = story.imgNames.filter((item) => {
        if (updateStoryDto.imgNames) {
          return updateStoryDto.imgNames.indexOf(item) < 0;
        }
      });
      this.deletePictures(diff);
    }

    const newStory = { ...story, ...updateStoryDto };
    await this.storiesRepository.update(id, newStory);
    return newStory;
  }

  async remove(id: number) {
    const story = await this.storiesRepository.findOneBy({ id });
    if (!story) {
      return;
    }
    this.deletePictures(story.imgNames);
    return await this.storiesRepository.delete({ id });
  }

  async addPicture(id: number, filename: string) {
    const story = await this.storiesRepository.findOneBy({ id });
    if (!story) {
      return;
    }

    // Adding new image to array
    let images = story.imgNames;
    if (!images) {
      images = [];
    }
    images.push(filename);
    return await this.storiesRepository.update(id, { imgNames: images });
  }

  async deletePictures(filenames: string[]) {
    filenames.forEach((filename) => {
      this.deletePicture(filename);
    });
  }

  async deletePicture(filename: string) {
    const path = './upload/stories';
    fs.unlink(`${path}/${filename}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  async getMap() {
    const stories = await this.findAllChecked();

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

  async getMapAll() {
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

  async getCalendar() {
    const records: Record<
      number,
      Record<number, Record<number, string[][]>>
    > = {};
    const map = await this.getMapAll();
    const years = Object.keys(map);

    for (let i = 0; i < years.length; i++) {
      const year = years[i];
      const stories: StoryInterface[] = map[year];
      const monthDateRecord: Record<number, Record<number, string[][]>> = {};
      for (let j = 0; j < stories.length; j++) {
        const story = stories[j];
        if (!story) {
          continue;
        }
        const date = new Date(story.date);
        const day = date.getDate();
        const month = date.getMonth();
        if (!monthDateRecord[month]) {
          monthDateRecord[month] = {};
        }
        if (!monthDateRecord[month][day]) {
          monthDateRecord[month][day] = [];
        }

        let link = 'stories/-1';
        if (story.show) {
          link = `stories/${story.id}`;
        }
        monthDateRecord[month][day].push([story.title, link]);
      }
      records[year] = monthDateRecord;
    }

    return records;
  }
}
