// src/modules/inventario/inventario.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventario } from '../../entities/inventario.entity';
import { Categoria } from '../../entities/categoria.entity';
import { Precio } from '../../entities/precio.entity';
import { Media } from '../../entities/media.entity';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Inventario, Categoria, Precio, Media])],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}
