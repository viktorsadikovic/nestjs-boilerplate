import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseConfigService, TypeOrmConfigService } from '..';
import { AppConfigurations, DatabseConfigurations } from '../../config';
import { ItemSeedModule } from './item/item-seed.module';
import { UserSeedModule } from './user/user-seed.module';

@Module({
  imports: [
    UserSeedModule,
    ItemSeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfigurations, DatabseConfigurations],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
  ],
})
export class SeedsModule {}
