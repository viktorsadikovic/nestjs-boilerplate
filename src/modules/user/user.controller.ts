import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { I18nLang } from 'nestjs-i18n';
import { ApiResponseObjectDto } from '../../common/decorators';
import { Serialize } from '../../common/interceptors';
import { ValidateMongoId } from '../../common/pipes';
import { CreateUserDto, UserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  @Serialize(UserDto)
  @ApiExtraModels(UserDto)
  @ApiResponseObjectDto(UserDto, true)
  public async findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Serialize(UserDto)
  @ApiExtraModels(UserDto)
  @ApiResponseObjectDto(UserDto)
  public async findOne(
    @Param('id', ValidateMongoId) id: string,
    @I18nLang() lang: string,
  ) {
    return this.service.findOne(id, lang);
  }

  @Post()
  @Serialize(UserDto)
  @ApiExtraModels(UserDto)
  @ApiResponseObjectDto(UserDto)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }

  @Delete(':id')
  public async delete(
    @Param('id', ValidateMongoId) id: string,
    @I18nLang() lang: string,
  ) {
    return this.service.delete(id, lang);
  }
}
