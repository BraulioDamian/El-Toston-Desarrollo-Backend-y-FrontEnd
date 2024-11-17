// src/modules/media/media.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner } from 'typeorm';
import { Media } from '../../entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import * as fs from 'fs';
import * as path from 'path';
;

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  // Crear un nuevo registro
  async create(createMediaDto: CreateMediaDto): Promise<Media> {
    try {
      const media = this.mediaRepository.create(createMediaDto);
      return await this.mediaRepository.save(media);
    } catch (error) {
      if (createMediaDto.ruta) {
        this.deleteFile(createMediaDto.ruta);
      }
      throw new BadRequestException('Error al crear el registro.');
    }
  }



  // Obtener todos los registros
  async findAll(): Promise<Media[]> {
    return this.mediaRepository.find();
  }

  // Obtener un registro por ID
  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOneBy({ id });
    if (!media) {
      throw new NotFoundException(`Registro con ID ${id} no encontrado`);
    }
    return media;
  }

  // Actualizar un registro existente
  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id } });

    if (!media) {
      throw new NotFoundException(`Media con ID ${id} no encontrada`);
    }

    if (updateMediaDto.ruta && media.ruta !== updateMediaDto.ruta) {
      this.deleteFile(media.ruta);
    }

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

    this.deleteFile(media.ruta);
    await this.mediaRepository.remove(media);
  }


  /**
   * Eliminar todos los medios asociados a un producto dentro de una transacción.
   */
  private deleteFile(filePath: string) {
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error al eliminar archivo:', error.message);
      }
    }
  }
  
  
}
