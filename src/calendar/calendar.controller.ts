import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UsePipes
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Calendar } from './schemas/calendar.schema';
import { generateCalendar } from 'src/utils/utils';
import { MonthValidationPipe } from 'src/pipes/month-validation.pipe';
import { CommonCalendarValidationPipe } from 'src/pipes/common.pipe';
import { Response } from 'express';
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
  @Post('register/:funciId/:month/')
  async registerFunciToListDays(
    @Param('funciId')
    funciId: string,
    @Param('month')
    month: string,
    @Body()
    listDays: string[],
    @Res() response: Response,
  ): Promise<Response> {

    const result = await this.calenderService.registerFunciToListDay(funciId, listDays, Number(month))

    if (result.status === HttpStatus.PARTIAL_CONTENT) {
      response.status(HttpStatus.PARTIAL_CONTENT).json(result);
    } else {
      response.status(result.status).json(result);
    }
    return response;
  }
  @Post('unregister/:funciId/:month/')
  async unregisterFunciToListDays(
    @Param('funciId')
    funciId: string,
    @Param('month')
    month: string,
    @Body()
    listDays: string[],
    @Res() response: Response,
  ): Promise<Response> {

    const result = await this.calenderService.unregisterFunciToListDay(funciId, listDays, Number(month))

    if (result.status === HttpStatus.PARTIAL_CONTENT) {
      response.status(HttpStatus.PARTIAL_CONTENT).json(result);
    } else {
      response.status(result.status).json(result);
    }
    return response;
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
