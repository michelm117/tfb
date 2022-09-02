import { Module } from '@nestjs/common';
import { RidersService } from './riders.service';
import { RidersController } from './riders.controller';
import { Rider } from './entities/rider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryService } from '../country/country.service';
import { Country } from '../country/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rider, Country])],
  controllers: [RidersController],
  providers: [RidersService, CountryService],
})
export class RidersModule {}
