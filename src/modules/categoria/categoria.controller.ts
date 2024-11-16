// src/modules/categoria/categoria.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // Crear una nueva categoría
  @Post()
  async create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  // Obtener todas las categorías
  @Get()
  async findAll() {
    return this.categoriaService.findAll();
  }

  // Obtener una categoría por ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  // Actualizar una categoría por ID
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  // Eliminar una categoría por ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriaService.remove(+id);
    return { message: `Categoría con ID ${id} eliminada exitosamente` };
  }
}
