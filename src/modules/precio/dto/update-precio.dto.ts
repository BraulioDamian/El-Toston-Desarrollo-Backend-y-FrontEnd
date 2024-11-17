// src/modules/precio/dto/update-precio.dto.ts


import { IsOptional, IsNumber, IsDateString, IsInt } from 'class-validator';

export class UpdatePrecioDto {
  @IsOptional()
  @IsInt()
  id?: number; // Permite identificar el precio a actualizar

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número válido con hasta 2 decimales' })
  precio?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin?: string | null;



}
