// src/usuarios/dto/update-usuario.dto.ts
import { IsString, MinLength, IsEmail, IsOptional } from 'class-validator';

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsEmail()
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsOptional()
  activo?: boolean;
}
