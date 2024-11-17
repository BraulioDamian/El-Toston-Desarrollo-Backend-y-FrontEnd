// src/modules/producto/producto.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { Producto } from '../../entities/producto.entity';
import { Categoria } from '../../entities/categoria.entity';
import { Precio } from '../../entities/precio.entity';
import { Media } from '../../entities/media.entity';
import { MediaService } from '../media/media.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Categoria, Precio, Media]),  
  ],
  providers: [ProductoService, MediaService],
  controllers: [ProductoController],
})
export class ProductoModule {}
