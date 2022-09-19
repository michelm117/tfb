import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  Country,
  CountryModule,
  Rider,
  About,
  RidersModule,
  AboutModule,
  StoriesModule,
  Story,
  Result,
  AgeCategory,
  Race,
  AgeCategoryModule,
  ResultModule,
  RacesModule,
  User,
  UserModule,
  AuthModule,
} from '@tfb/api/core';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          Rider,
          Country,
          About,
          Story,
          Result,
          AgeCategory,
          Race,
          User,
        ],
        synchronize: true,
        logging: true,
      }),
    }),
    RidersModule,
    CountryModule,
    AboutModule,
    StoriesModule,
    RacesModule,
    AgeCategoryModule,
    ResultModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
