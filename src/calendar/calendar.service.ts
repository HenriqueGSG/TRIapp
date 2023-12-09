import { Injectable, NotFoundException } from '@nestjs/common';
import { Calendar } from './schemas/calendar.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateCalendar } from 'src/utils/utils';

@Injectable()
export class CalendarService {

    constructor(
        @InjectModel(Calendar.name)
        private calendarModel: mongoose.Model<Calendar>

    ) { }



    async findAll(): Promise<Calendar[]> {
        const months = await this.calendarModel.find()
        return months

    }
    async findOne(monthIntRef: number): Promise<Calendar> {
        const monthData = await this.calendarModel.findOne({ monthIntRef }).exec()

        if (!monthData) {
            throw new NotFoundException('Month not found.')
        }
        console.log(monthData)
        return monthData

    }
    async createCalendar(month: number): Promise<Calendar> {
        const existingCalendar = await this.calendarModel.findOne({ monthIntRef: month }).exec();

        if (existingCalendar) {
            throw new NotFoundException('This month is already created!')
        }
        const monthInt = Number(month)
        const newCalendar = generateCalendar(monthInt, 2023)
        console.log(newCalendar)

        const res = await this.calendarModel.create(newCalendar)
        return res
    }


}
