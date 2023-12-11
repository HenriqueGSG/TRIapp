import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class CommonCalendarValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type === 'param') {
            switch (metadata.data) {
                case 'funciId':
                    this.validateFunciId(value);
                    break;
                case 'month':
                    this.validateMonth(value);
                    break;
                case 'day':
                    this.validateDay(value);
                    break;
            }
        }

        return value;
    }

    private validateFunciId(value: any) {
        const funciIdPattern = /^F\d{7}$/;
        if (!funciIdPattern.test(value)) {
            throw new BadRequestException('Invalid funciId format');
        }
    }

    private validateMonth(value: any) {
        const month = Number(value);
        if (!Number.isInteger(month) || month < 1 || month > 12) {
            throw new BadRequestException('Invalid month format');
        }
    }

    private validateDay(value: any) {
        const dayPattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!dayPattern.test(value)) {
            throw new BadRequestException('Invalid day format');
        }
    }
}
