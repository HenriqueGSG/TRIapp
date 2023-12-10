import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException
} from '@nestjs/common';

@Injectable()
export class MonthValidationPipe implements PipeTransform {
  transform(monthStr: any, metadata: ArgumentMetadata) {
    const month = parseInt(monthStr, 10);

    if (isNaN(month) || month < 1 || month > 12) {
      throw new BadRequestException('Invalid month. Must be between 1 and 12.');
    }

    return month;
  }
}
