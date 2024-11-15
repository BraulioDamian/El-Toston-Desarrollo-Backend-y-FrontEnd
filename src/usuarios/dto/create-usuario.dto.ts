// src/usuarios/dto/create-usuario.dto.ts
import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail({}, { message: 'Correo electrónico no válido' })
  @IsOptional()
  correo?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsInt()
  @IsNotEmpty()
  rolId: number;
}
