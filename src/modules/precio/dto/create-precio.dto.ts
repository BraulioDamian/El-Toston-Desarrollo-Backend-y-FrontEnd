import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreatePrecioDto {
  @IsNumber()
  precio: number;

  @IsDateString()
  fecha_inicio: Date;

  @IsDateString()
  @IsOptional()
  fecha_fin?: Date;
}
