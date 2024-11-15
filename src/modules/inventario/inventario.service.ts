// src/modules/inventario/inventario.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventario } from '../../entities/inventario.entity';
import { Categoria } from '../../entities/categoria.entity';
import { Precio } from '../../entities/precio.entity';
import { Media } from '../../entities/media.entity';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';



@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Inventario)
    private inventarioRepository: Repository<Inventario>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    @InjectRepository(Precio)
    private precioRepository: Repository<Precio>,

    @InjectRepository(Media)
    private mediaRepository: Repository<Media>,
  ) {}

  async create(createInventarioDto: CreateInventarioDto): Promise<Inventario> {
    const { nombre, descripcion, stock, categoria_id, precios, media } = createInventarioDto;

    // Verificar que la categoría existe
    let categoria: Categoria | null = null;
    if (categoria_id) {
      categoria = await this.categoriaRepository.findOne({ where: { id: categoria_id } });
      if (!categoria) throw new NotFoundException(`La categoría con ID ${categoria_id} no existe`);
    }

    // Crear el inventario con la categoría
    const inventario = this.inventarioRepository.create({
      nombre,
      descripcion,
      stock,
      categoria,
    });
    await this.inventarioRepository.save(inventario);

    // Agregar precios si se proporcionaron
    if (precios && precios.length > 0) {
      for (const precioData of precios) {
        const precio = this.precioRepository.create({
          ...precioData,
          inventario,
        });
        await this.precioRepository.save(precio);
      }
    }

    // Agregar media (imágenes/videos) si se proporcionaron
    if (media && media.length > 0) {
      for (const mediaData of media) {
        const mediaItem = this.mediaRepository.create({
          ...mediaData,
          inventario,
        });
        await this.mediaRepository.save(mediaItem);
      }
    }

    // Retornar el inventario recién creado junto con sus relaciones
    return this.inventarioRepository.findOne({
      where: { id: inventario.id },
      relations: ['categoria', 'precios', 'media'],
    });
  }

  // Obtener todos los registros de inventario
  async findAll(): Promise<Inventario[]> {
    return this.inventarioRepository.find({
      relations: ['categoria', 'precios', 'media'],
    });
  }

  // Obtener un registro de inventario por ID
  async findOne(id: number): Promise<Inventario> {
    const inventario = await this.inventarioRepository.findOne({
      where: { id },
      relations: ['categoria', 'precios', 'media'],
    });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    return inventario;
  }

  // Actualizar un registro de inventario
  async update(id: number, updateInventarioDto: UpdateInventarioDto): Promise<Inventario> {
    const { nombre, descripcion, stock, categoria_id, precios, media } = updateInventarioDto;

    // Buscar el inventario existente
    const inventario = await this.inventarioRepository.findOne({ 
      where: { id },
      relations: ['categoria', 'precios', 'media'],
    });
    if (!inventario) throw new NotFoundException(`Inventario con ID ${id} no encontrado`);

    // Actualizar los campos principales del inventario
    if (nombre) inventario.nombre = nombre;
    if (descripcion) inventario.descripcion = descripcion;
    if (stock !== undefined) inventario.stock = stock;

    // Verificar y actualizar la categoría
    if (categoria_id) {
      const categoria = await this.categoriaRepository.findOne({ where: { id: categoria_id } });
      if (!categoria) throw new NotFoundException(`La categoria con ID ${categoria_id} no existe`);
      inventario.categoria = categoria;
    }

    // Actualizar precios
    if (precios) {
      await this.precioRepository.delete({ inventario: { id } });
      for (const precioData of precios) {
        const precio = this.precioRepository.create({
          ...precioData,
          inventario,
        });
        await this.precioRepository.save(precio);
      }
    }

    // Actualizar media
    if (media) {
      await this.mediaRepository.delete({ inventario: { id } });
      for (const mediaData of media) {
        const mediaItem = this.mediaRepository.create({
          ...mediaData,
          inventario,
        });
        await this.mediaRepository.save(mediaItem);
      }
    }

    // Guardar los cambios del inventario
    await this.inventarioRepository.save(inventario);

    // Retornar el inventario actualizado junto con las relaciones
    return this.inventarioRepository.findOne({
      where: { id: inventario.id },
      relations: ['categoria', 'precios', 'media'],
    });
  }

  // Método para eliminar un inventario por ID
  async remove(id: number): Promise<string> {
    const inventario = await this.inventarioRepository.findOne({ where: { id } });

    if (!inventario) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }

    await this.inventarioRepository.remove(inventario);
    return `Producto en inventario con ID ${id} eliminado correctamente.`;
  }
  
}