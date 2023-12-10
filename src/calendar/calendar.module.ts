import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CalendarSchema } from './schemas/calendar.schema';
import { FunciSchema } from 'src/funci/schemas/funci.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Calendar', schema: CalendarSchema }]),
    MongooseModule.forFeature([{ name: 'Funci', schema: FunciSchema }]),
  ],
  controllers: [CalendarController],
  providers: [CalendarService]
})
export class CalendarModule { }
