import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class ValidateMongoId implements PipeTransform<string> {
  constructor(private readonly logger: Logger) {}
  transform(value: string, metadata: ArgumentMetadata) {
    const i18n = I18nContext.current();
    const message = i18n.t('common.INVALID_MONGO_ID');
    if (isValidObjectId(value)) {
      if (String(new ObjectId(value)) === value) return value;
      this.logger.error(`{message: '${message}', requestId: '${value}' }`);
      throw new BadRequestException(message);
    }
    this.logger.error(`{message: '${message}', requestId: '${value}' }`);
    throw new BadRequestException(message);
  }
}
