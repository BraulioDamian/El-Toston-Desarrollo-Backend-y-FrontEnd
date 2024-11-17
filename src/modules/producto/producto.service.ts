// src/modules/producto/producto.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection, DataSource } from 'typeorm';
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
import { MediaType } from '../../enums/media-type.enum';


@Injectable()
export class ProductoService {
  constructor(

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,



    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,

    private readonly mediaService: MediaService, // Inyectamos MediaService
    private readonly dataSource: DataSource,


  ) {}




  async create(createProductoDto: CreateProductoDto, files: Express.Multer.File[]): Promise<Producto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Crear el Producto
      const producto = this.productoRepository.create(createProductoDto);
      const savedProducto = await queryRunner.manager.save(producto);
  
      // Crear los medios asociados al producto
      for (const file of files) {
        const tipo: MediaType = file.mimetype.startsWith('image') ? MediaType.IMAGEN : MediaType.VIDEO; // Usa el enum directamente
  
        // Evitamos consultar el producto en MediaService y pasamos el objeto directamente
        const media = this.mediaRepository.create({
          titulo: file.originalname,
          descripcion: '',
          tipo,
          ruta: file.path,
          producto: savedProducto, // Asignamos el producto directamente
        });
  
        await queryRunner.manager.save(media); // Guardar el medio en la misma transacción
      }
  
      await queryRunner.commitTransaction();
      return savedProducto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
  
      // Limpieza de archivos subidos
      for (const file of files) {
        this.mediaService.deleteOrphanedFile(file.path);
      }
  
      throw new BadRequestException(`Error al crear producto: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
  
  

  







  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
    files: Express.Multer.File[],
  ): Promise<Producto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Buscar el producto existente
      const producto = await queryRunner.manager.findOne(Producto, {
        where: { id },
        relations: ['media'],
      });
  
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
  
      // Actualizar datos del producto
      Object.assign(producto, updateProductoDto);
      const updatedProducto = await queryRunner.manager.save(producto);
  
      // Manejo de medios (esto sí debe estar dentro de la transacción)
      if (files && files.length > 0) {
        for (const media of producto.media) {
          await this.mediaService.deleteOrphanedFile(media.ruta); // Eliminar archivo
          await queryRunner.manager.remove(Media, media); // Eliminar registro
        }
  
        for (const file of files) {
          const tipo: MediaType = file.mimetype.startsWith('image') ? MediaType.IMAGEN : MediaType.VIDEO; // Usa el enum directamente
  
          const media = this.mediaRepository.create({
            titulo: file.originalname,
            descripcion: '',
            tipo,
            ruta: file.path,
            producto: updatedProducto,
          });
  
          await queryRunner.manager.save(media);
        }
      }
  
      await queryRunner.commitTransaction();
      return updatedProducto;
    } catch (error) {
      await queryRunner.rollbackTransaction();
  
      // Limpieza de archivos subidos
      if (files && files.length > 0) {
        for (const file of files) {
          await this.mediaService.deleteOrphanedFile(file.path);
        }
      }
  
      throw new BadRequestException(`Error al actualizar producto: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
  
  

  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
  
    try {
      // Buscar el producto con sus relaciones
      const producto = await queryRunner.manager.findOne(Producto, {
        where: { id },
        relations: ['media'], // Incluir medios asociados
      });
  
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }
  
      // Eliminar archivos físicos relacionados con los medios
      for (const media of producto.media) {
        await this.mediaService.deleteOrphanedFile(media.ruta); // Eliminar archivo físico
      }
  
      // Eliminar el producto y sus medios (relación configurada como ON DELETE CASCADE)
      await queryRunner.manager.remove(producto);
  
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al eliminar producto: ${error.message}`);
    } finally {
      await queryRunner.release();
    }
  }
  


  async findAll(): Promise<Producto[]> {
    return await this.productoRepository.find({
      relations: ['media'], // Incluye la relación con Media
    });
  }
  

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['media'], // Incluye la relación con Media
    });
  
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  
    return producto;
  }
  


}
