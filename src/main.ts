import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // Agrega protección a las cabeceras
  //app.enableCors();  // Configura CORS según tus necesidades

  app.enableCors({
    origin: 'https://abcdefg123.ngrok.io' // Reemplaza con tu URL de ngrok
  });

  await app.listen(3000);
}
bootstrap();