import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shape } from '../../../common/enums';
import { Item } from '../../../modules/item/entity/item.entity';

@Injectable()
export class ItemSeedService {
  constructor(
    @InjectRepository(Item)
    private repository: Repository<Item>,
  ) {}

  async run() {
    const item = await this.repository.findOneBy({
      name: 'TEST_ITEM',
    });

    if (!item) {
      await this.repository.save({
        name: 'TEST_ITEM',
        color: 'green',
        shape: Shape.CIRCLE,
        quantity: 2,
      });
    }
  }
}
