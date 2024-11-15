// src/modules/inventario/dto/update-inventario.dto.ts

import { IsOptional, IsString, IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrecioDto } from '../../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../../media/dto/create-media.dto';

export class UpdateInventarioDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  // Agregar `categoria_id` aquí
  @IsOptional()
  @IsInt()
  categoria_id?: number;
  
  // Nuevos campos para precios y media (imágenes/videos)
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrecioDto)
  precios?: CreatePrecioDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  media?: CreateMediaDto[];
}
