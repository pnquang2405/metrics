import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidInterval', async: false })
export class IsValidInterval implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    const intervalPattern = /^\d+\s*(days|months|years|hours|minutes|seconds)$/;
    return intervalPattern.test(value);
  }

  defaultMessage(): string {
    return 'Invalid interval format. Expected format: "<number> <unit>"';
  }
}
