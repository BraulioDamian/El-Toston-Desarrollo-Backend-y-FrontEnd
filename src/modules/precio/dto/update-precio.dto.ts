// src/modules/precio/dto/update-precio.dto.ts

import { IsNumber, IsDateString, IsOptional, Min } from 'class-validator';

export class UpdatePrecioDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;

  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;
}
