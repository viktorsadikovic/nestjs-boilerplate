import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { UserNotFoundException } from '../../common/exceptions';
import { User, UserDocument } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18nService: I18nService,
  ) {}

  public async findAll(): Promise<UserDocument[]> {
    return this.userModel.find();
  }

  public async findOne(id: string, lang: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ _id: id });

    if (!user)
      throw new UserNotFoundException(
        this.i18nService.t('common.USER_NOT_FOUND', { lang }),
      );

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);

    return await this.userModel.create({
      ...createUserDto,
      password,
    });
  }

  public async delete(id: string, lang: string) {
    const user = await this.userModel.findOne({ _id: id });

    if (!user)
      throw new UserNotFoundException(
        this.i18nService.t('common.USER_NOT_FOUND', { lang }),
      );

    return this.userModel.deleteOne({ _id: id });
  }
}
