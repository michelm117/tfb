import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>
  ) {}

  async create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    await this.countryRepository.save(country);
    return country;
  }

  findAll() {
    return this.countryRepository.find();
  }

  findOneByIso(iso: string) {
    return this.countryRepository.find({ where: { iso } });
  }

  findOne(id: number) {
    return this.countryRepository.findOneBy({ id });
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.findOneBy({ id });
    if (!country) {
      return;
    }

    return await this.countryRepository.update(id, updateCountryDto);
  }

  async remove(id: number) {
    return await this.countryRepository.delete(id);
  }
}
