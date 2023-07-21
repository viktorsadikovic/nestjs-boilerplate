import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Item } from '../modules/item/entity/item.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.postgres.type', { infer: true }),
      url: this.configService.get('database.postgres.url', { infer: true }),
      host: this.configService.get('database.postgres.host', { infer: true }),
      port: this.configService.get('database.postgres.port', { infer: true }),
      username: this.configService.get('database.postgres.username', {
        infer: true,
      }),
      password: this.configService.get('database.postgres.password', {
        infer: true,
      }),
      database: this.configService.get('database.postgres.name', {
        infer: true,
      }),
      synchronize: this.configService.get('database.postgres.synchronize', {
        infer: true,
      }),
      dropSchema: false,
      keepConnectionAlive: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // entities: [Item],
    } as TypeOrmModuleOptions;
  }
}
