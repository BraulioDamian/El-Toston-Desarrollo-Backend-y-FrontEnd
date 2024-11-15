// src/modules/inventario/dto/create-inventario.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsInt, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrecioDto } from '../../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../../media/dto/create-media.dto';



export class CreateInventarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @IsOptional()
  categoria_id?: number;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsInt()
  @IsOptional()
  stock: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrecioDto)
  precios: CreatePrecioDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  media: CreateMediaDto[];
}
