// src/modules/media/dto/update-media.dto.ts

import { IsString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(['Imagen', 'Video'])
  tipo?: 'Imagen' | 'Video';

  @IsOptional()
  @IsString()
  ruta?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  orden?: number;
}
