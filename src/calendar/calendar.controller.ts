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
import { CommonCalendarValidationPipe } from 'src/pipes/common.pipe';

@Controller('calendar')
export class CalendarController {
  constructor(private calenderService: CalendarService, private monthValidationPipe: MonthValidationPipe,
    private commonCalendarValidationPipe: CommonCalendarValidationPipe) { }

  @Get()
  async getMonths(): Promise<Calendar[]> {
    return this.calenderService.findAll();
  }

  @Get(':month')
  @UsePipes(MonthValidationPipe)
  async getMonth(
    @Param('month')
    monthIntRef: number
  ): Promise<Calendar> {
    return this.calenderService.findOne(monthIntRef);
  }

  @Post('create/:month')
  @UsePipes(MonthValidationPipe)
  async createCalendar(
    @Param('month')
    month: number
  ): Promise<Calendar> {
    return this.calenderService.createCalendar(month);
  }


  @Post('register/:funciId/:month/:day')
  @UsePipes(CommonCalendarValidationPipe)
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


  @Post('unregister/:funciId/:month/:day')
  @UsePipes(CommonCalendarValidationPipe)
  async unregisterFunciFromDay(
    @Param('funciId')
    funciId: string,
    @Param('month')
    month: string,
    @Param('day')
    day: string
  ): Promise<Calendar> {
    return this.calenderService.unregisterFunciFromDay(funciId, day, Number(month));
  }
}
