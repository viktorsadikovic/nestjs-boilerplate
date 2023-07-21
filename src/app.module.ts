import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import * as path from 'path';
import { AppConfigurations, DatabseConfigurations } from './config';
import { MongooseConfigService, TypeOrmConfigService } from './database';
import { HealthModule } from './modules/health/health.module';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { SeedsModule } from './database/seeds/seeds.module';

@Module({
  imports: [
    UserModule,
    ItemModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfigurations, DatabseConfigurations],
      envFilePath: ['.env'],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ttl: configService.get('app.throttler.ttl'),
        limit: configService.get('app.throttler.limit'),
      }),
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
        viewEngine: 'ejs',
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) => {
            return [configService.get('app.headerLanguage')];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    HealthModule,
    SeedsModule,
  ],
  providers: [Logger, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
