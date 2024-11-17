// src/modules/producto/producto.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { Producto } from '../../entities/producto.entity';
import { Categoria } from '../../entities/categoria.entity';
import { Precio } from '../../entities/precio.entity';
import { Media } from '../../entities/media.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { MediaService } from '../media/media.service';
import * as fs from 'fs';
import * as path from 'path';
import { UpdateMediaDto } from '../media/dto/update-media.dto';
import { CreateMediaDto } from '../media/dto/create-media.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    @InjectRepository(Precio)
    private precioRepository: Repository<Precio>,

    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,

    private readonly mediaService: MediaService,

    private readonly connection: Connection,
  ) {}

  /**
   * Crear producto con relaciones (media y precio).
   */
//  async create(createProductoDto: CreateProductoDto, files: Express.Multer.File[]): Promise<Producto> {
//    const { media, precio, categoria_id, ...productoData } = createProductoDto;
//
//    // Validar categoría
//    let categoria = null;
//    if (categoria_id) {
//      categoria = await this.categoriaRepository.findOne({ where: { id: categoria_id } });
//      if (!categoria) {
//        throw new NotFoundException(`La categoría con ID ${categoria_id} no existe`);
//      }
//    }
//
//    // Crear producto
//    const producto = this.productoRepository.create({
//      ...productoData,
//      categoria,
//    });
//    await this.productoRepository.save(producto);
//
//    // Guardar precio asociados
//    if (precio?.length > 0) {
//      const precioEntities = precio.map((precioDto) =>
//        this.precioRepository.create({ ...precioDto, producto }),
//      );
//      await this.precioRepository.save(precioEntities);
//    }
//
//    // Procesar medios
//    await this.processMedia(media, files, producto);
//
//    // Retornar producto con relaciones
//    return this.productoRepository.findOne({
//      where: { id: producto.id },
//      relations: ['categoria', 'precio', 'media'],
//    });
//  }
//
//  /**
//   * Obtener todos los productos con sus relaciones.
//   */
//  async findAll(): Promise<Producto[]> {
//    return this.productoRepository.find({
//      relations: ['categoria', 'precio', 'media'],
//    });
//  }
//
//  /**
//   * Obtener un producto por ID con sus relaciones.
//   */
//  async findOne(id: number): Promise<Producto> {
//    const producto = await this.productoRepository.findOne({
//      where: { id },
//      relations: ['categoria', 'precio', 'media'],
//    });
//    if (!producto) {
//      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
//    }
//    return producto;
//  }
//
//  /**
//   * Actualizar un producto con sus precio y medios.
//   */
//  async update(
//    id: number,
//    updateProductoDto: UpdateProductoDto,
//    files: Express.Multer.File[], // Archivos de medios actualizados
//  ): Promise<Producto> {
//    const queryRunner = this.connection.createQueryRunner();
//    await queryRunner.connect();
//    await queryRunner.startTransaction();
//
//    try {
//      // 1. Buscar el producto existente con sus relaciones
//      const producto = await queryRunner.manager.findOne(Producto, {
//        where: { id },
//        relations: ['categoria', 'precio', 'media'],
//      });
//
//      if (!producto) {
//        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
//      }
//
//      // 2. Actualizar los campos básicos del producto
//      const { categoria_id, precio, media, ...productoData } = updateProductoDto;
//
//      if (categoria_id !== undefined) {
//        const categoria = await queryRunner.manager.findOne(Categoria, { where: { id: categoria_id } });
//        if (!categoria) {
//          throw new NotFoundException(`Categoría con ID ${categoria_id} no encontrada.`);
//        }
//        producto.categoria = categoria;
//      }
//
//      Object.assign(producto, productoData);
//      await queryRunner.manager.save(producto);
//
//      // 3. Actualizar Precio
//      if (precio !== undefined) {
//        // Obtener IDs de precio actuales
//        const existingPrecioIds = producto.precio.map((precio) => precio.id);
//        const incomingPrecioIds = precio.filter(p => p.id).map(p => p.id);
//
//        // Identificar precio a eliminar
//        const precioToRemove = existingPrecioIds.filter(id => !incomingPrecioIds.includes(id));
//
//        if (precioToRemove.length > 0) {
//          await queryRunner.manager.delete(Precio, precioToRemove);
//        }
//
//        // Actualizar o crear precio
//        for (const precioDto of precio) {
//          if (precioDto.id) {
//            // Actualizar precio existente
//            const precio = await queryRunner.manager.findOne(Precio, { where: { id: precioDto.id, producto: { id } } });
//            if (precio) {
//              Object.assign(precio, {
//                precio: precioDto.precio,
//                fecha_inicio: new Date(precioDto.fecha_inicio),
//                fecha_fin: precioDto.fecha_fin ? new Date(precioDto.fecha_fin) : null,
//              });
//              await queryRunner.manager.save(precio);
//            } else {
//              throw new NotFoundException(`Precio con ID ${precioDto.id} no encontrado para este producto.`);
//            }
//          } else {
//            // Crear nuevo precio
//            const newPrecio = this.precioRepository.create({
//              ...precioDto,
//              fecha_inicio: new Date(precioDto.fecha_inicio),
//              fecha_fin: precioDto.fecha_fin ? new Date(precioDto.fecha_fin) : null,
//              producto,
//            });
//            await queryRunner.manager.save(newPrecio);
//          }
//        }
//      }
//
//      // 4. Actualizar Medios
//      if (media !== undefined) {
//        // Suponiendo que updateProductoDto.media es un array de UpdateMediaDto
//        const mediaArray = Array.isArray(media) ? media : media ? [media] : [];
//        const filesArray = Array.isArray(files) ? files : files ? [files] : [];
//
//        // Validar correspondencia entre medios y archivos
//        if (mediaArray.length !== filesArray.length) {
//          throw new BadRequestException('La cantidad de medios no coincide con los archivos subidos.');
//        }
//
//        for (let i = 0; i < mediaArray.length; i++) {
//          const mediaDto = mediaArray[i];
//          const file = filesArray[i];
//
//          if (mediaDto.id) {
//            // Actualizar medio existente
//            const existingMedia = producto.media.find(m => m.id === mediaDto.id);
//            if (existingMedia) {
//              const updatedMediaDto: UpdateMediaDto = {
//                ...mediaDto,
//                ...(file ? { ruta: file.path } : {}),
//              };
//              await this.mediaService.update(existingMedia.id, updatedMediaDto, queryRunner);
//            } else {
//              throw new NotFoundException(`Media con ID ${mediaDto.id} no encontrado para este producto.`);
//            }
//          } else {
//            // Crear nuevo medio
//            const createMediaDto: CreateMediaDto = {
//              ...mediaDto,
//              ruta: file.path,
//            };
//            const newMedia = this.mediaRepository.create({ ...createMediaDto, producto });
//            await queryRunner.manager.save(newMedia);
//          }
//        }
//
//        // Identificar medios a eliminar (presentes en la base de datos pero no en el DTO)
//        const incomingMediaIds = mediaArray.filter(m => m.id).map(m => m.id);
//        const existingMediaIds = producto.media.map(m => m.id);
//        const mediaToRemove = existingMediaIds.filter(id => !incomingMediaIds.includes(id));
//
//        for (const mediaId of mediaToRemove) {
//          await this.mediaService.remove(mediaId, queryRunner);
//        }
//      }
//
//      // 5. Confirmar la transacción
//      await queryRunner.commitTransaction();
//
//      // 6. Retornar el producto actualizado con relaciones
//      return this.productoRepository.findOne({
//        where: { id },
//        relations: ['categoria', 'precio', 'media'],
//      });
//    } catch (error) {
//      // Revertir la transacción en caso de error
//      await queryRunner.rollbackTransaction();
//      throw new BadRequestException(`Error al actualizar el producto: ${error.message}`);
//    } finally {
//      // Liberar el queryRunner
//      await queryRunner.release();
//    }
//  }

  /**
   * Eliminar un producto, incluyendo sus precio y medios.
   */
//    async remove(id: number): Promise<string> {
//      const producto = await this.productoRepository.findOne({
//        where: { id },
//        relations: ['precio', 'media'],
//      });
//  
//      if (!producto) {
//        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
//      }
//  
//      const queryRunner = this.connection.createQueryRunner();
//      await queryRunner.connect();
//      await queryRunner.startTransaction();
//  
//      try {
//        // 1. Eliminar medios asociados utilizando MediaService
//        await this.mediaService.deleteFile(id, queryRunner);
//  
//        // 2. Eliminar precio asociados
//        if (producto.precio && producto.precio.length > 0) {
//          await queryRunner.manager.delete(Precio, { producto: { id } });
//        }
//  
//        // 3. Eliminar el producto
//        await queryRunner.manager.remove(Producto, producto);
//  
//        // 4. Confirmar la transacción
//        await queryRunner.commitTransaction();
//  
//        return `Producto con ID ${id} y sus precio y medios eliminados correctamente.`;
//      } catch (error) {
//        // 5. Revertir la transacción en caso de error
//        await queryRunner.rollbackTransaction();
//        throw new BadRequestException(`Error al eliminar el producto: ${error.message}`);
//      } finally {
//        // 6. Liberar el queryRunner
//        await queryRunner.release();
//      }
//    }
//  
//  
//  
//  
//  
//    /**
//     * Actualizar solo los medios de un producto.
//     */
//    async updateMedia(
//      id: number,
//      mediaDtos: CreateMediaDto[],
//      files: Express.Multer.File[],
//    ): Promise<Media[]> {
//      // Verificar que el producto exista
//      const producto = await this.productoRepository.findOne({
//        where: { id },
//        relations: ['media'],
//      });
//    
//      if (!producto) {
//        throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
//      }
//    
//      // Eliminar los medios existentes y sus archivos asociados
//      for (const media of producto.media) {
//        await this.mediaService.remove(media.id); // Elimina el medio y su archivo
//      }
//    
//      // Crear nuevos medios
//      const newMedias = await this.processMedia(mediaDtos, files, producto);
//    
//      return newMedias;
//    }
//    
//  
//  
//  
//  
//  
//   /**
//   * Procesar y guardar medios asociados al producto.
//   */
//   private async processMedia(
//    mediaDtos: CreateMediaDto[],
//    files: Express.Multer.File[],
//    producto: Producto,
//  ): Promise<Media[]> {
//    const newMedias: Media[] = await Promise.all(
//      mediaDtos.map((mediaDto, index) => {
//        // Asegurar que el DTO tiene la ruta del archivo asignada
//        const createMediaItem: CreateMediaDto = {
//          ...mediaDto,
//          ruta: files[index]?.path || '', // Asignar ruta del archivo
//        };
//  
//        return this.mediaService.createWithFile(createMediaItem, producto, files[index]);
//      }),
//    );
//  
//    return newMedias;
//  }


}
