import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Calendar } from './schemas/calendar.schema';
import { generateCalendar } from 'src/utils/utils';
import { MonthValidationPipe } from 'src/pipes/month-validation.pipe';

@Controller('calendar')
export class CalendarController {
  constructor(private calenderService: CalendarService) { }

  @Get()
  async getMonths(): Promise<Calendar[]> {
    return this.calenderService.findAll();
  }

  @Get(':month')
  @UsePipes(new MonthValidationPipe())
  async getMonth(
    @Param('month')
    monthIntRef: number
  ): Promise<Calendar> {
    return this.calenderService.findOne(monthIntRef);
  }

  @Post(':month')
  @UsePipes(new MonthValidationPipe())
  async createCalendar(
    @Param('month')
    month: number
  ): Promise<Calendar> {
    return this.calenderService.createCalendar(month);
  }
  @Post('register/:funciId/:month/:day')
  // @UsePipes(new MonthValidationPipe())
  async registerFunciToDay(
    @Param('funciId')
    funciId: string,
    @Param('month')
    month: string,
    @Param('day')
    day: string
  ): Promise<Calendar> {
    return this.calenderService.registerFunciToDay(funciId, day, Number(month));
  }
  @Post('remove/:funciId/:month/:day')
  // @UsePipes(new MonthValidationPipe())
  async removeFunciFromDay(
    @Param('funciId')
    funciId: string,
    @Param('month')
    month: string,
    @Param('day')
    day: string
  ): Promise<Calendar> {
    return this.calenderService.removeFunciFromDay(funciId, day, Number(month));
  }
}
