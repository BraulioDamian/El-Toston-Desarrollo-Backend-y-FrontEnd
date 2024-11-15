import { Controller, Get } from '@nestjs/common';

@Controller('usuarios')
export class UsuariosController {
    @Get('prueba')
    pruebaConexion(){
        return {mensaje: 'Conexion exitosa con el backend :)'}
    }
}
