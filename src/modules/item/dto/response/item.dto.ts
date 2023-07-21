import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Shape } from '../../../../common/enums';

export class ItemDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  @Expose()
  shape: Shape;

  @ApiProperty()
  @Expose()
  quantity: number;
}
