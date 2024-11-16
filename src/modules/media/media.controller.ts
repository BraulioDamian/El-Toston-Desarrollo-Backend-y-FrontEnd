// src/modules/media/media.controller.ts}

import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { multerConfig } from '../../common/config/multer.config';
import { FileCleanupInterceptor } from '../../common/interceptors/file-cleanup.interceptor';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', multerConfig),
    FileCleanupInterceptor,
  )
  async create(
    @Body() createMediaDto: CreateMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    if (!file) {
      return res.status(400).json({ message: 'Archivo no proporcionado' });
    }

    const newMedia = await this.mediaService.create({
      ...createMediaDto,
      ruta: file.path,
    });

    return res.status(201).json({
      message: 'Archivo creado exitosamente',
      media: newMedia,
    });
  }


  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.mediaService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', multerConfig),
    FileCleanupInterceptor,
  )
  async update(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res,
  ) {
    const updatedMedia = await this.mediaService.update(+id, {
      ...updateMediaDto,
      ...(file && { ruta: file.path }),
    });

    return res.status(200).json({
      message: 'Archivo actualizado exitosamente',
      media: updatedMedia,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.mediaService.remove(+id);
    return { message: `Registro con ID ${id} eliminado exitosamente` };
  }
}