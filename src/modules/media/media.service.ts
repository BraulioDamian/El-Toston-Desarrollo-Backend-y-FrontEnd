// src/modules/media/media.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Media } from '../../entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Producto } from 'src/entities/producto.entity';
;

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  // Crear un nuevo registro
  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    let producto: Producto | null = null;

    // Verificar si se proporciona productoId y obtener el Producto relacionado
    if (createMediaDto.productoId) {
      producto = await this.productoRepository.findOne({
        where: { id: createMediaDto.productoId },
      });

      if (!producto) {
        throw new NotFoundException(`Producto con ID ${createMediaDto.productoId} no encontrado`);
      }
    }

    const media = this.mediaRepository.create({
      ...createMediaDto,
      producto,
    });

    return await this.mediaRepository.save(media);
  }


  

  // Obtener todos los registros
  async findAll(): Promise<Media[]> {
    return this.mediaRepository.find({ relations: ['producto'] }); // Incluir relación con Producto
  }

  // Obtener un registro por ID
  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({
      where: { id },
      relations: ['producto'], // Incluir relación con Producto
    });
    if (!media) {
      throw new NotFoundException(`Media con ID ${id} no encontrada`);
    }
    return media;
  }

  // Actualizar un registro existente
  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id } });
  
    if (!media) {
      throw new NotFoundException(`Media con ID ${id} no encontrada`);
    }
  
    // Si hay una nueva ruta, elimina la imagen anterior
    if (updateMediaDto.ruta && media.ruta !== updateMediaDto.ruta) {
      this.deleteOrphanedFile(media.ruta);
    }
  
    // Actualizar el producto relacionado si se envía `productoId`
    if (updateMediaDto.productoId) {
      const producto = await this.productoRepository.findOne({
        where: { id: updateMediaDto.productoId },
      });
  
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${updateMediaDto.productoId} no encontrado`);
      }
  
      media.producto = producto;
    }
  
    // Asignar nuevos valores al objeto media
    Object.assign(media, updateMediaDto);
  
    return this.mediaRepository.save(media);
  }

  /**
   * Eliminar un medio existente, manejando la eliminación del archivo.
   */
  async remove(id: number): Promise<void> {
    const media = await this.mediaRepository.findOne({ where: { id } });
    if (!media) {
      throw new NotFoundException(`Media con ID ${id} no encontrada`);
    }

    this.deleteOrphanedFile(media.ruta);
    await this.mediaRepository.remove(media);
  }



  
  

  async deleteOrphanedFile(filePath: string): Promise<void> {
    const uploadsDir = path.resolve('./uploads'); // Directorio permitido
    const absolutePath = path.resolve(filePath);
  
    // Verificar que el archivo esté dentro del directorio permitido
    if (!absolutePath.startsWith(uploadsDir)) {
      console.error(`Intento de eliminar un archivo fuera del directorio permitido: ${absolutePath}`);
      return;
    }
  
    // Verificar si el archivo existe
    if (fs.existsSync(absolutePath)) {
      try {
        fs.unlinkSync(absolutePath);
        console.log(`Archivo huérfano eliminado: ${absolutePath}`);
      } catch (error) {
        console.error(`Error al eliminar el archivo huérfano: ${absolutePath}`, error.message);
      }
    } else {
      console.log(`Archivo huérfano no encontrado: ${absolutePath}`);
    }
  }
  
  
  
    /**
   * Eliminar todos los medios asociados a un producto dentro de una transacción.
   */

  
}
