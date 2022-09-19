import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { CreateResultDto } from '../result/dto/create-result.dto';
import { DeleteResultDto } from './dto/delete-result.dto';

export const storage = {
  storage: diskStorage({
    destination: './upload/races',
    filename: (req, file, cb) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('myrace')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}
  @Post()
  create(@Body() createRaceDto: CreateRaceDto) {
    return this.racesService.create(createRaceDto);
  }

  @Get()
  findAll() {
    return this.racesService.findAll();
  }

  @Get('map')
  async getMap() {
    return await this.racesService.getMap();
  }

  @Get('years')
  async getYears() {
    return await this.racesService.getYears();
  }

  @Get('calendar')
  async getCalendar() {
    return await this.racesService.getCalendar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.racesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRaceDto: UpdateRaceDto) {
    return this.racesService.update(+id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.racesService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.racesService.addPicture(+id, file.filename);
    return { imagePath: file.filename };
  }

  @Get('image/:fileName')
  async findProfileImage(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    return res.sendFile(join(process.cwd(), 'upload/races/' + fileName));
  }

  @Patch('add-result/:id')
  async addResult(
    @Param('id') id: string,
    @Body() createResultDto: CreateResultDto
  ) {
    return await this.racesService.addResult(+id, createResultDto);
  }

  @Patch('delete-result/:id')
  async deleteResult(
    @Param('id') id: string,
    @Body() deleteResultDto: DeleteResultDto
  ) {
    return await this.racesService.deleteResult(+id, deleteResultDto.resultId);
  }
}
