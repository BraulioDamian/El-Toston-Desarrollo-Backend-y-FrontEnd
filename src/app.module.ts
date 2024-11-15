import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsuariosModule } from './modules/users/usuarios.module';
import { AuthModule } from './auth/auth.module';



import { CategoriaModule } from './modules/categoria/categoria.module';

import { InventarioModule } from './modules/inventario/inventario.module';
import { PrecioModule } from './modules/precio/precio.module';
import { MediaModule } from './modules/media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Cambia a true solo en desarrollo
        logging: true,
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    AuthModule,
    CategoriaModule,
    InventarioModule,
    PrecioModule,
    MediaModule,
  ],
})
export class AppModule {}
