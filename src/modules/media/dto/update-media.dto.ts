// src/modules/media/dto/update-media.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsOptional, IsInt } from 'class-validator';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {
  @IsOptional()
  @IsInt()
  id?: number; // Permite identificar el medio a actualizar
}