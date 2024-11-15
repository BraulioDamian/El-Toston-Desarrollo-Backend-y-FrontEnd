// src/modules/media/media.controller.ts

import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post(':inventarioId')
  async create(@Param('inventarioId') inventarioId: number, @Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.create(inventarioId, createMediaDto);
  }

  @Get()
  async findAll() {
    return this.mediaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.mediaService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.mediaService.remove(id);
    return { message: `Media con ID ${id} eliminado exitosamente` };
  }
}
