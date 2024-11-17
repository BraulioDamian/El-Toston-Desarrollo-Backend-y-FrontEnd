// src/producto/producto.controller.ts

import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile, Res, NotFoundException, BadRequestException, UploadedFiles, Req, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ParseJsonPipe } from './parse-json.pipe';
import { CreatePrecioDto } from '../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';
import { Request, Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';


@Controller('producto')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}


//    @Post()
//    async createProducto(
//      @Req() req: Request,
//      @Body('precio', ParseJsonPipe) precio: CreatePrecioDto[],
//      @Body('media', ParseJsonPipe) media: CreateMediaDto[] | CreateMediaDto, // Permitir un solo medio o varios
//      @Body() createProductoDto: CreateProductoDto,
//    ) {
//    const files = req.files as Express.Multer.File[] | Express.Multer.File; // Permitir un archivo o varios
//  
//    // Convertir medios y archivos en arreglos si no lo son
//    const mediaArray = Array.isArray(media) ? media : [media];
//    const filesArray = Array.isArray(files) ? files : [files];
//  
//    // Validar correspondencia entre medios y archivos
//    if (mediaArray.length !== filesArray.length) {
//      throw new BadRequestException('La cantidad de medios no coincide con los archivos subidos.');
//    }
//  
//    // Asignar rutas a los medios
//    mediaArray.forEach((mediaItem, index) => {
//      mediaItem.ruta = filesArray[index]?.path || '';
//    });
//  
//    createProductoDto.precio = precio;
//    createProductoDto.media = mediaArray;
//  
//    return this.productoService.create(createProductoDto, filesArray);
//  }



  /**
  * Obtener todos los productos.
  */
//  @Get()
//  async findAll() {
//    return this.productoService.findAll();
//  }
//
//  /**
//  * Obtener un producto por ID.
//  */
//  @Get(':id')
//  async findOne(@Param('id', ParseIntPipe) id: number) {
//    return this.productoService.findOne(id);
//  }



   /**
   * Actualizar un prodducto con relaciones.
   */ 
//   @Put(':id')
//   async updateInventario(
//     @Req() req: Request,
//     @Param('id') id: string,
//     @Body('precio', ParseJsonPipe) precio: CreatePrecioDto[],
//     @Body('media', ParseJsonPipe) media: CreateMediaDto[],
//     @Body() updateInventarioDto: UpdateInventarioDto,
//   ) {
//    const files = req.files as Express.Multer.File[];
//    const mediaArray = Array.isArray(media) ? media : [media];
//    const filesArray = Array.isArray(files) ? files : [files];
//  
//    if (mediaArray.length !== filesArray.length) {
//      throw new BadRequestException('La cantidad de medios no coincide con los archivos subidos.');
//    }
//  
//    // Asignar rutas a los medios
//    mediaArray.forEach((mediaItem, index) => {
//      mediaItem.ruta = filesArray[index]?.path || '';
//    });
//  
//    updateInventarioDto.precio = precio;
//    updateInventarioDto.media = mediaArray;
//  
//    return this.inventarioService.update(+id, updateInventarioDto, filesArray);
//  }



/**
   * Actualizar un producto con sus precio y medios.
   */
//  @Put(':id')
//  @UseInterceptors(FilesInterceptor('files', 10, { // Ajusta el límite de archivos según tus necesidades
//    storage: diskStorage({
//      destination: './uploads', // Ajusta la ruta de destino según tu configuración
//      filename: (req, file, cb) => {
//        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//        cb(null, uniqueSuffix + path.extname(file.originalname));
//      },
//    }),
//  }))
//  async updateProducto(
//    @Param('id', ParseIntPipe) id: number,
//    @Body('precio', ParseJsonPipe) precio: UpdateProductoDto['precio'],
//    @Body('media', ParseJsonPipe) media: UpdateProductoDto['media'], // Puede ser un solo medio o varios
//    @Body() updateProductoDto: UpdateProductoDto,
//    @UploadedFiles() files: Express.Multer.File[],
//  ) {
//    // Convertir media a array si no lo es
//    const mediaArray = Array.isArray(media) ? media : media ? [media] : [];
//    const filesArray = Array.isArray(files) ? files : files ? [files] : [];
//  
//    // Validar correspondencia entre medios y archivos
//    if (mediaArray.length !== filesArray.length) {
//      throw new BadRequestException('La cantidad de medios no coincide con los archivos subidos.');
//    }
//  
//    // Asignar rutas a los medios si son nuevos (sin ID)
//    mediaArray.forEach((mediaItem, index) => {
//      if (!mediaItem.id) {
//        mediaItem.ruta = filesArray[index]?.path || '';
//      }
//    });
//  
//    updateProductoDto.precio = precio;
//    updateProductoDto.media = mediaArray;
//  
//    return this.productoService.update(id, updateProductoDto, filesArray);
//  }







 /**
   * Actualizar solo los medios de un producto.
   */
//   @Put(':id/media')
//   @UseInterceptors(FilesInterceptor('files', 10, { // Límite de 10 archivos
//     storage: diskStorage({
//       destination: './uploads', // Carpeta donde se almacenan los archivos
//       filename: (req, file, cb) => {
//         const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//       },
//     }),
//   }))
//   async updateProductoMedia(
//     @Param('id', ParseIntPipe) id: number,
//     @Body('media', ParseJsonPipe) media: CreateMediaDto[] | CreateMediaDto, // Los datos de los medios en JSON
//     @UploadedFiles() files: Express.Multer.File[], // Los archivos subidos
//     @Res() res: Response,
//   ) {
//     try {
//       // Convertir el parámetro media en un arreglo si es necesario
//       const mediaArray = Array.isArray(media) ? media : [media];
//       const filesArray = Array.isArray(files) ? files : [files];
//   
//       // Validar que la cantidad de medios coincide con los archivos
//       if (mediaArray.length !== filesArray.length) {
//         throw new BadRequestException('La cantidad de medios no coincide con los archivos subidos.');
//       }
//   
//       // Asignar las rutas de los archivos a los medios
//       mediaArray.forEach((mediaItem, index) => {
//         mediaItem.ruta = filesArray[index]?.path || '';
//       });
//   
//       // Llamar al servicio para actualizar los medios del producto
//       const updatedMedia = await this.productoService.updateMedia(id, mediaArray, filesArray);
//   
//       return res.status(200).json({
//         message: 'Medios actualizados exitosamente',
//         media: updatedMedia,
//       });
//     } catch (error) {
//       return res.status(error.getStatus ? error.getStatus() : 500).json({
//         message: error.message || 'Error al actualizar los medios del producto',
//       });
//     }
//   }
//   
//  
//  
//    /**
//     * Eliminar un producto.
//     */
//    @Delete(':id')
//    async remove(@Param('id', ParseIntPipe) id: number) {
//      return this.productoService.remove(id);
//    }
  
}
