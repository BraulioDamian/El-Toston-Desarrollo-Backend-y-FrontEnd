// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from '../entities/usuario.entity';
import { Rol } from '../entities/rol.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol]) // Registra los repositorios de Usuario y Rol
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Exporta UsuariosService si se usa en otros módulos
})
export class UsuariosModule {}