// src/modules/precio/dto/create-precio.dto.ts

import { IsNotEmpty, IsNumber, IsDate, IsOptional, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePrecioDto {
  @IsNotEmpty({ message: 'El precio es obligatorio' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido con hasta 2 decimales' })
  precio: number;

  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin?: string | null;
}