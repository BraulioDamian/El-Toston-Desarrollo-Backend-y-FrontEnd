// src/modules/media/media.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Media } from '../../entities/media.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService]  // Exporta MediaService para que otros módulos puedan usarlo
})
export class MediaModule {}