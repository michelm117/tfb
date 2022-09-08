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
import { RidersService } from './riders.service';
import { CreateRiderDto } from './dto/create-rider.dto';
import { UpdateRiderDto } from './dto/update-rider.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './upload/riders',
    filename: (req, file, cb) => {
      const filename =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
@Controller('riders')
export class RidersController {
  constructor(private readonly ridersService: RidersService) {}

  @Post()
  create(@Body() createRiderDto: CreateRiderDto) {
    return this.ridersService.create(createRiderDto);
  }

  @Get()
  findAll() {
    return this.ridersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ridersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRiderDto: UpdateRiderDto) {
    return this.ridersService.update(+id, updateRiderDto);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadProfilePicture(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    await this.ridersService.updateProfilePicture(+id, file.filename);
    return { imagePath: file.filename };
  }

  @Delete()
  deleteProfilePicture(@Param('id') id: string) {
    return this.ridersService.deleteProfilePicture(+id);
  }

  @Get('image/:fileName')
  async findProfileImage(
    @Param('fileName') fileName: string,
    @Res() res: Response
  ) {
    // const fileName = await this.ridersService.getProfilePictureName(+id);
    return res.sendFile(join(process.cwd(), 'upload/riders/' + fileName));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ridersService.remove(+id);
  }
}
