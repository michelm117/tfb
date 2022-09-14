import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAgeCategoryDto } from './dto/create-age-category.dto';
import { UpdateAgeCategoryDto } from './dto/update-age-category.dto';
import { AgeCategory } from './entities/age-category.entity';

@Injectable()
export class AgeCategoryService {
  constructor(
    @InjectRepository(AgeCategory)
    private ageCategoryRepository: Repository<AgeCategory>
  ) {}

  async create(createAgeCategoryDto: CreateAgeCategoryDto) {
    const ageCategory = this.ageCategoryRepository.create(createAgeCategoryDto);
    await this.ageCategoryRepository.save(ageCategory);
    return ageCategory;
  }

  findAll() {
    return this.ageCategoryRepository.find();
  }

  findOne(id: number) {
    return this.ageCategoryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAgeCategoryDto: UpdateAgeCategoryDto) {
    const ageCategory = await this.ageCategoryRepository.findOneBy({ id });
    if (!ageCategory) {
      return;
    }

    return await this.ageCategoryRepository.update(id, updateAgeCategoryDto);
  }

  async remove(id: number) {
    return await this.ageCategoryRepository.delete(id);
  }
}
