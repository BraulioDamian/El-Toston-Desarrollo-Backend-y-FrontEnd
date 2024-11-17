// src/modules/producto/dto/update-producto.dto.ts
import { IsOptional, IsString, IsInt, IsArray, ValidateNested, Min, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateMediaDto } from '../../media/dto/update-media.dto';
import { UpdatePrecioDto } from '../../precio/dto/update-precio.dto';

export class UpdateProductoDto {
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

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty({ each: true })
  mediaToDelete?: number[]; // IDs de medios a eliminar


  // Agregar `categoria_id` aquí
  @IsOptional()
  @IsInt()
  categoria_id?: number;

  // Nuevos campos para precio
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdatePrecioDto)
  precio?: UpdatePrecioDto[];

  // Actualización de medios
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateMediaDto)
  media?: UpdateMediaDto[] | UpdateMediaDto; // Puede ser un solo medio o varios
}
