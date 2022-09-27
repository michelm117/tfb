/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import cookieParser = require('cookie-parser');

import { AppModule } from './app/app.module';
import { environment } from './environments/environment.prod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (environment.production) {
    app.enableCors({
      credentials: true,
      origin: true,
      allowedHeaders: ['Content-Type', 'x-requested-with'],
    });
  }

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());

  const globalPrefix = 'tfb';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
