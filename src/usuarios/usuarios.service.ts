// src/usuarios/usuarios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { Rol } from '../entities/rol.entity';
import * as bcrypt from 'bcrypt';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
    @InjectRepository(Rol)
    private rolesRepository: Repository<Rol>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

// Método para crear un nuevo usuario
async create(createUserDto: CreateUsuarioDto): Promise<Usuario> {
  const { password, rolId, ...userData } = createUserDto;
  const hashedPassword = await this.hashPassword(password);

  // Buscar el rol usando el ID proporcionado
  const rol = await this.rolesRepository.findOne({ where: { id: rolId } });
  if (!rol) {
    throw new NotFoundException(`Rol con ID ${rolId} no encontrado`);
  }

  const usuario = this.usuariosRepository.create({
    ...userData,
    password: hashedPassword,
    rol,
  });

  return this.usuariosRepository.save(usuario);
}

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({ relations: ['rol'] });
  }

  async findByUsername(username: string): Promise<Usuario | undefined> {
    return this.usuariosRepository.findOne({
      where: { username },
      relations: ['rol'],
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { id }, relations: ['rol'] });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

  async update(id: number, updateUserDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await this.hashPassword(updateUserDto.password);
    }
    Object.assign(usuario, updateUserDto);
    return this.usuariosRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuariosRepository.remove(usuario);
  }
}
