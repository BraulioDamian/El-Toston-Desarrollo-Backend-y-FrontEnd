// src/modules/categoria/dto/create-categoria.dto.ts

import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
