// src/producto/producto.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Res, NotFoundException, BadRequestException, UploadedFiles, Req, ParseIntPipe, Patch, HttpCode } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ParseJsonPipe } from './parse-json.pipe';
import { CreatePrecioDto } from '../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { Request, Response } from 'express';
import { diskStorage } from 'multer';
import path from 'path';
import { FilesInterceptor } from '@nestjs/platform-express'; // Soporta múltiples archivos
import { multerConfig } from 'src/common/config/multer.config';


@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('media', 10, multerConfig), // Maneja hasta 10 archivos
  )
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @UploadedFiles() files: Express.Multer.File[], // Captura los archivos subidos
  ) {
    // Verificar que se haya subido al menos un archivo
    if (!files || files.length === 0) {
      throw new BadRequestException('Debe proporcionar al menos un archivo para crear un producto.');
    }

    const newProducto = await this.productoService.create(createProductoDto, files);
    return {
      message: 'Producto creado exitosamente',
      producto: newProducto,
    };
  }






  

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('media', 10, multerConfig)) // Hasta 10 archivos
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length === 0 && Object.keys(updateProductoDto).length === 0) {
      throw new BadRequestException(
        'Debe proporcionar datos para actualizar el producto o al menos un archivo.',
      );
    }

    const updatedProducto = await this.productoService.update(id, updateProductoDto, files);
    return {
      message: 'Producto actualizado exitosamente',
      producto: updatedProducto,
    };
  }

  @Delete(':id')
  @HttpCode(200) // Respuesta con contenido en caso de éxito
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.productoService.remove(id);
      return {
        message: `Producto con id ${id} eliminado correctamente`,
      };
    } catch (error) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
  }


    @Get()
  async findAll() {
    const productos = await this.productoService.findAll();
    return {
      message: 'Lista de productos',
      productos,
    };
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const producto = await this.productoService.findOne(id);
    return {
      message: 'Producto encontrado',
      producto,
    };
  }


  
}
