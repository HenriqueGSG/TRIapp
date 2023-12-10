import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Calendar } from './schemas/calendar.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateCalendar } from 'src/utils/utils';
import { validateDay, validateDuplicateFunciId, validateListFunciLength } from 'src/utils/validators';

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

    async registerFunciToDay(funciId: string, day: string, month: number): Promise<Calendar> {
        console.log(funciId, month, day)
        const daySelected = await this.calendarModel.findOne({
            'monthIntRef': month,
            'days.day': day,
        }).exec()
        const selectedDayObject = validateDay(daySelected, day);

        validateDuplicateFunciId(selectedDayObject, funciId)

        validateListFunciLength(selectedDayObject.listFunci, 5)
        // if (selectedDayObject.listFunci.length > 5) {
        //     throw new BadRequestException('Exceeded maximum limit.');
        // }


        selectedDayObject.listFunci.push(funciId)
        daySelected.markModified('days')
        await daySelected.save()

        return daySelected
    }

    async removeFunciFromDay(funciId: string, day: string, month: number): Promise<Calendar> {
        console.log(funciId, month, day)
        const daySelected = await this.calendarModel.findOne({
            'monthIntRef': month,
            'days.day': day,
        }).exec()
        const selectedDayObject = validateDay(daySelected, day);


        if (!selectedDayObject.listFunci.includes(funciId)) {
            throw new NotFoundException('Funci is not registered on this day.');
        }
        // validateDuplicateFunciId(selectedDayObject, funciId)

        // validateListFunciLength(selectedDayObject.listFunci, 5)
        // // if (selectedDayObject.listFunci.length > 5) {
        // //     throw new BadRequestException('Exceeded maximum limit.');
        // // }


        selectedDayObject.listFunci = selectedDayObject.listFunci.filter((id) => id !== funciId)
        daySelected.markModified('days')
        await daySelected.save()

        return daySelected
    }

}
