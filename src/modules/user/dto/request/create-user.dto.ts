import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString({ message: i18nValidationMessage('common.INVALID_EMAIL') })
  lastName: string;

  @ApiProperty()
  @IsNumber({})
  age: number;

  @ApiProperty()
  @IsEmail({}, { message: i18nValidationMessage('common.INVALID_EMAIL') })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: i18nValidationMessage('common.NOT_EMPTY') })
  password: string;
}
