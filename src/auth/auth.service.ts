// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const usuario = await this.usuariosService.findByUsername(username);
    if (usuario && (await this.usuariosService.validatePassword(pass, usuario.password))) {
      const { password, ...result } = usuario;
      return result; // Retorna el usuario sin la contraseña
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, rol: user.rol.nombre };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}