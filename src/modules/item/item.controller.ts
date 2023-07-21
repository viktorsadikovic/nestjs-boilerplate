import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { I18nLang } from 'nestjs-i18n';
import { ApiResponseObjectDto } from '../../common/decorators';
import { Serialize } from '../../common/interceptors';
import { CreateItemDto, ItemDto } from './dto';
import { ItemService } from './item.service';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly service: ItemService) {}

  @Get()
  @Serialize(ItemDto)
  @ApiExtraModels(ItemDto)
  @ApiResponseObjectDto(ItemDto, true)
  public async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Serialize(ItemDto)
  @ApiExtraModels(ItemDto)
  @ApiResponseObjectDto(ItemDto)
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
    @I18nLang() lang: string,
  ) {
    return this.service.findOne(id, lang);
  }

  @Post()
  @Serialize(ItemDto)
  @ApiExtraModels(ItemDto)
  @ApiResponseObjectDto(ItemDto)
  public async create(@Body() createItemDto: CreateItemDto) {
    return this.service.create(createItemDto);
  }

  @Delete(':id')
  public async delete(
    @Param('id', ParseIntPipe) id: number,
    @I18nLang() lang: string,
  ) {
    return this.service.delete(id, lang);
  }
}
