// src/modules/precio/precio.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Precio } from '../../entities/precio.entity';
import { CreatePrecioDto } from './dto/create-precio.dto';
import { UpdatePrecioDto } from './dto/update-precio.dto';
import { Inventario } from '../../entities/inventario.entity';

@Injectable()
export class PrecioService {
  constructor(
    @InjectRepository(Precio)
    private readonly precioRepository: Repository<Precio>,

    @InjectRepository(Inventario)
    private readonly inventarioRepository: Repository<Inventario>,
  ) {}

  async create(inventarioId: number, createPrecioDto: CreatePrecioDto): Promise<Precio> {
    const inventario = await this.inventarioRepository.findOne({ where: { id: inventarioId } });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${inventarioId} no encontrado`);

    const precio = this.precioRepository.create({
      ...createPrecioDto,
      inventario,
    });
    return this.precioRepository.save(precio);
  }

  async findAll(): Promise<Precio[]> {
    return this.precioRepository.find({ relations: ['inventario'] });
  }

  async findOne(id: number): Promise<Precio> {
    const precio = await this.precioRepository.findOne({ where: { id }, relations: ['inventario'] });
    if (!precio) throw new NotFoundException(`Precio con ID ${id} no encontrado`);
    return precio;
  }

  async update(id: number, updatePrecioDto: UpdatePrecioDto): Promise<Precio> {
    const precio = await this.findOne(id);
    Object.assign(precio, updatePrecioDto);
    return this.precioRepository.save(precio);
  }

  async remove(id: number): Promise<void> {
    const precio = await this.findOne(id);
    await this.precioRepository.remove(precio);
  }
}
