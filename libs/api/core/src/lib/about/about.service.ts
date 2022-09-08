import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { About } from './entities/about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    if ((await this.count()) !== 0) {
      return new BadRequestException('About text already exists');
    }

    const aboutText = this.aboutRepository.create(createAboutDto);
    return await this.aboutRepository.save(aboutText);
  }

  async count() {
    return await this.aboutRepository.count();
  }

  async find() {
    return await this.aboutRepository.find();
  }

  async update(updateAboutDto: UpdateAboutDto) {
    const count = await this.count();
    if (count === 0) {
      return new BadRequestException(
        "About text cant be updated. Text doesn't exists yet"
      );
    }

    const abouts = await this.find();

    return await this.aboutRepository.update(abouts[0].id, updateAboutDto);
  }
}
