import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Shape } from '../../../../common/enums';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsEnum(Shape)
  shape: Shape;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
