// src/modules/producto/dto/create-producto.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsInt, ValidateNested, IsArray, IsNumber, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrecioDto } from '../../precio/dto/create-precio.dto';
import { CreateMediaDto } from '../../media/dto/create-media.dto';


export class CreateProductoDto {

  @IsString({ message: 'El nombre del producto es obligatorio.' })
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


 @IsArray({ message: 'El campo media debe ser un array.' })
  @ValidateNested({ each: true, message: 'Cada elemento de media debe ser válido.' })
  @Type(() => CreateMediaDto) // Transforma cada elemento en CreateMediaDto
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos una imagen para el producto.' }) // Validación obligatoria
  media: CreateMediaDto[];
  
}
