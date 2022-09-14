import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { Country } from '../country/entities/country.entity';
import { CountryService } from '../country/country.service';
import { Result } from '../result/entities/result.entity';
import { AgeCategory } from '../age-category/entities/age-category.entity';
import { RidersService } from '../riders/riders.service';
import { Rider } from '../riders/entities/rider.entity';
import { ResultService } from '../result/result.service';
import { AgeCategoryService } from '../age-category/age-category.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Race, Country, Result, AgeCategory, Rider]),
  ],
  controllers: [RacesController],
  providers: [
    RacesService,
    CountryService,
    RidersService,
    ResultService,
    AgeCategoryService,
  ],
})
export class RacesModule {}
