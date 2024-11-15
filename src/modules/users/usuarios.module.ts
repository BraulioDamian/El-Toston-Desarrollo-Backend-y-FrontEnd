import { UsuariosService } from './usuarios.service';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';

@Module({
    imports: [],
    controllers: [UsuariosController],
    providers: [UsuariosService,],
})
export class UsuariosModule { }
