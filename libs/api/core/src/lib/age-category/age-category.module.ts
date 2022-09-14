import { Module } from '@nestjs/common';
import { AgeCategoryService } from './age-category.service';
import { AgeCategoryController } from './age-category.controller';
import { AgeCategory } from './entities/age-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AgeCategory])],
  controllers: [AgeCategoryController],
  providers: [AgeCategoryService],
})
export class AgeCategoryModule {}
