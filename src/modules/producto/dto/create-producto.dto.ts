// src/modules/producto/dto/create-producto.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsInt, ValidateNested, IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrecioDto } from '../../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../../media/dto/create-media.dto';


export class CreateProductoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
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
  precio: CreatePrecioDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMediaDto)
  media?: CreateMediaDto[] | CreateMediaDto; // Acepta un solo medio o varios
}
