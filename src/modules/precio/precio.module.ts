// src/modules/precio/precio.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Precio } from '../../entities/precio.entity';
import { Inventario } from '../../entities/inventario.entity';
import { PrecioService } from './precio.service';
import { PrecioController } from './precio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Precio, Inventario])],
  providers: [PrecioService],
  controllers: [PrecioController],
})
export class PrecioModule {}
