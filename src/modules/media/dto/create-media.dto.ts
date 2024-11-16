// src/modules/media/dto/create-media.dto.ts
import { IsString, IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { MediaType } from '../../../enums/media-type.enum';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(MediaType, { message: `El tipo debe ser uno de: ${Object.values(MediaType).join(', ')}` })
  tipo?: MediaType;

  @IsString()
  ruta: string;

  @IsOptional()
  @IsInt()
  @Min(0, { message: 'El orden debe ser un entero positivo.' })
  orden?: number;

  @IsOptional()
  @IsInt({ message: 'El producto_id debe ser un número entero.' })
  productoId?: number;
  
}
