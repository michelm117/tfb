import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './upload/stories',
    filename: (req, file, cb) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('story')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    return this.storiesService.create(createStoryDto);
  }

  @Get()
  findAll() {
    return this.storiesService.findAllChecked();
  }

  @Get('all')
  findAllShow() {
    return this.storiesService.findAll();
  }

  @Get('map')
  getMap() {
    return this.storiesService.getMap();
  }

  @Get('years')
  getYears() {
    return this.storiesService.getYears();
  }

  @Get('calendar')
  getCalendar() {
    return this.storiesService.getCalendar();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storiesService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.storiesService.addPicture(+id, file.filename);
    return { imagePath: file.filename };
  }

  @Get('image/:fileName')
  async findProfileImage(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    return res.sendFile(join(process.cwd(), 'upload/stories/' + fileName));
  }
}
