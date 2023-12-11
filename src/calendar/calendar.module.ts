import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarSchema } from './schemas/calendar.schema';
import { FunciSchema } from 'src/funci/schemas/funci.schema';
import { CommonCalendarValidationPipe } from 'src/pipes/common.pipe';
import { MonthValidationPipe } from 'src/pipes/month-validation.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Calendar', schema: CalendarSchema }]),
    MongooseModule.forFeature([{ name: 'Funci', schema: FunciSchema }]),

  ],
  controllers: [CalendarController,],
  providers: [CalendarService, CommonCalendarValidationPipe, MonthValidationPipe]
})
export class CalendarModule { }
