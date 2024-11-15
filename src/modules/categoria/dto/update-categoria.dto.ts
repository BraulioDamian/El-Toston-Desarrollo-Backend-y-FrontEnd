// src/modules/categoria/dto/update-categoria.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoriaDto {
  @IsString()
  @IsOptional()
  nombre?: string;
}
