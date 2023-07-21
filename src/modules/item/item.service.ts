import { Injectable } from '@nestjs/common';
import { Item } from './entity/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemNotFoundException } from '../../common/exceptions';
import { I18nService } from 'nestjs-i18n';
import { CreateItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
    private readonly i18nService: I18nService,
  ) {}

  public async findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }

  public async findOne(id: number, lang: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item)
      throw new ItemNotFoundException(
        this.i18nService.t('common.ITEM_NOT_FOUND', { lang }),
      );

    return item;
  }

  public async create(createItemDto: CreateItemDto) {
    return this.itemsRepository.save(createItemDto);
  }

  public async delete(id: number, lang: string) {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item)
      throw new ItemNotFoundException(
        this.i18nService.t('common.ITEM_NOT_FOUND', { lang }),
      );

    return this.itemsRepository.delete({ id });
  }
}
