// src/modules/media/dto/create-media.dto.ts

import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';

export enum MediaType {
  IMAGEN = 'Imagen',
  VIDEO = 'Video',
}

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsEnum(MediaType)
  tipo: MediaType;

  @IsString()
  ruta: string;

  @IsInt()
  orden: number;
}