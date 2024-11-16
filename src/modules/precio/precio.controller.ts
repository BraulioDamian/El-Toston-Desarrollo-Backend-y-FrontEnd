// src/modules/precio/precio.controller.ts

import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { PrecioService } from './precio.service';
import { CreatePrecioDto } from './dto/create-precio.dto';
import { UpdatePrecioDto } from './dto/update-precio.dto';

@Controller('precio')
export class PrecioController {
  constructor(private readonly precioService: PrecioService) {}

  @Post(':productoId')
  async create(@Param('productoId') productoId: number, @Body() createPrecioDto: CreatePrecioDto) {
    return this.precioService.create(productoId, createPrecioDto);
  }

  @Get()
  async findAll() {
    return this.precioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.precioService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePrecioDto: UpdatePrecioDto) {
    return this.precioService.update(id, updatePrecioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.precioService.remove(id);
    return { message: `Precio con ID ${id} eliminado exitosamente` };
  }
}
