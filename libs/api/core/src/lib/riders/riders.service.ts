import { Injectable } from '@nestjs/common';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { Rider } from './entities/rider.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryService } from '../country/country.service';
import * as fs from 'fs';

@Injectable()
export class RidersService {
  constructor(
    @InjectRepository(Rider)
    private ridersRepository: Repository<Rider>,
    private countryService: CountryService
  ) {}

  async create(createRiderDto: CreateRiderDto) {
    const rider = this.ridersRepository.create(createRiderDto);
    await this.ridersRepository.save(rider);
    return rider;
  }

  findAll() {
    return this.ridersRepository.find({ relations: ['country'] });
  }

  findOne(id: number) {
    return this.ridersRepository.find({
      where: { id },
      relations: ['country'],
    });
  }

  async update(id: number, updateRiderDto: UpdateRiderDto) {
    const rider = await this.ridersRepository.findOneBy({ id });
    if (!rider) {
      return;
    }
    const country = updateRiderDto.country;
    if (country) {
      const countryEntity = await this.countryService.findOne(country.id);
      if (!countryEntity) {
        return;
      }
      rider.country = countryEntity;
    }
    const newRider = { ...rider, ...updateRiderDto };
    return await this.ridersRepository.update(id, newRider);
  }

  async remove(id: number) {
    return await this.ridersRepository.delete(id);
  }

  async updateProfilePicture(id: number, filename: string) {
    const rider = await this.ridersRepository.findOneBy({ id });
    if (!rider) {
      return;
    }
    // delete old picture from disk
    const path = './upload/riders';
    fs.unlink(`${path}/${rider.imgName}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    // updating new filename
    return await this.ridersRepository.update(id, { imgName: filename });
  }

  async deleteProfilePicture(id: number) {
    const rider = await this.ridersRepository.findOneBy({ id });
    if (!rider) {
      return;
    }
    return await this.ridersRepository.update(id, { imgName: 'default.png' });
  }

  async getProfilePictureName(id: number) {
    const rider = await this.ridersRepository.findOneBy({ id });
    if (!rider) {
      return;
    }
    return rider.imgName;
  }
}
