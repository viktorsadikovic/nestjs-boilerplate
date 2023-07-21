import { BadRequestException } from '@nestjs/common';

export class ItemNotFoundException extends BadRequestException {
  constructor(error?: string) {
    super(error);
  }
}
