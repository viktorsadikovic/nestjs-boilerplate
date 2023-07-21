import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from '../../../modules/item/entity/item.entity';
import { ItemSeedService } from './item-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemSeedService],
  exports: [ItemSeedService],
})
export class ItemSeedModule {}
