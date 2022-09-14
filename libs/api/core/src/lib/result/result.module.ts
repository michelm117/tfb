import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { RidersService } from '../riders/riders.service';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rider } from '../riders/entities/rider.entity';
import { Country } from '../country/entities/country.entity';
import { CountryService } from '../country/country.service';
import { AgeCategoryService } from '../age-category/age-category.service';
import { Race } from '../races/entities/race.entity';
import { AgeCategory } from '../age-category/entities/age-category.entity';
import { RacesService } from '../races/races.service';
import { RacesModule } from '../races/races.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, Rider, Country, Race, AgeCategory]),
  ],
  controllers: [ResultController],
  providers: [
    ResultService,
    RidersService,
    CountryService,
    AgeCategoryService,
    RacesService,
  ],
})
export class ResultModule {}
