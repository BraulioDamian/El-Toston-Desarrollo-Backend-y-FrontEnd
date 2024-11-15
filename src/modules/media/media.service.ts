// src/modules/media/media.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../../entities/media.entity';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Inventario } from '../../entities/inventario.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,

    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async create(inventarioId: number, createMediaDto: CreateMediaDto): Promise<Media> {
    const inventario = await this.inventarioRepository.findOne({ where: { id: inventarioId } });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${inventarioId} no encontrado`);

    const media = this.mediaRepository.create({
      ...createMediaDto,
      inventario,
    });
    return this.mediaRepository.save(media);
  }

  async findAll(): Promise<Media[]> {
    return this.mediaRepository.find({ relations: ['inventario'] });
  }

  async findOne(id: number): Promise<Media> {
    const media = await this.mediaRepository.findOne({ where: { id }, relations: ['inventario'] });
    if (!media) throw new NotFoundException(`Media con ID ${id} no encontrado`);
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);
    Object.assign(media, updateMediaDto);
    return this.mediaRepository.save(media);
  }

  async remove(id: number): Promise<void> {
    const media = await this.findOne(id);
    await this.mediaRepository.remove(media);
  }
}
