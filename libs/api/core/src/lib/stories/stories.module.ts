import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from '../country/country.service';
import { Story } from './entities/story.entity';
import { Country } from '../country/entities/country.entity';
import { RiderService } from '@tfb/web/data';
import { Rider } from '../riders/entities/rider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story, Country])],
  controllers: [StoriesController],
  providers: [StoriesService, CountryService],
})
export class StoriesModule {}
