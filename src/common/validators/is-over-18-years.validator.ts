import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ name: 'IsOver18Years', async: false })
export class IsOver18Years implements ValidatorConstraintInterface {
  validate(propertyValue: string, args: ValidationArguments) {
    return dayjs().diff(propertyValue, 'years') >= 18;
  }

  defaultMessage(args: ValidationArguments) {
    return `User must be at least 18 years old.`;
  }
}
