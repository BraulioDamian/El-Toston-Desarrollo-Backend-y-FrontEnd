// src/modules/media/media.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from '../../entities/media.entity';
import { Inventario } from '../../entities/inventario.entity';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Media, Inventario])],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
