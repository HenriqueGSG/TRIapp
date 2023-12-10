import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Calendar } from './schemas/calendar.schema';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { generateCalendar } from 'src/utils/utils';
import { registerDayValidation, removeDayValidation } from 'src/utils/validators';
import { Funci } from 'src/funci/schemas/funci.schema';

interface CalendarDocument extends Calendar, Document { }

@Injectable()
export class CalendarService {
    constructor(
        @InjectModel(Calendar.name)
        private readonly calendarModel: Model<CalendarDocument>,
        @InjectModel(Funci.name)
        private readonly funciModel: Model<Funci>
    ) { }

    async findAll(): Promise<Calendar[]> {
        const months = await this.calendarModel.find();
        return months;
    }
    async findOne(monthIntRef: number): Promise<Calendar> {
        const monthData = await this.calendarModel.findOne({ monthIntRef }).exec();

        if (!monthData) {
            throw new NotFoundException('Month not found.');
        }
        return monthData;
    }
    async createCalendar(month: number): Promise<Calendar> {
        const existingCalendar = await this.calendarModel.findOne({ monthIntRef: month }).exec();

        if (existingCalendar) {
            throw new NotFoundException('This month is already created!');
        }
        const monthInt = Number(month);
        const newCalendar = generateCalendar(monthInt, 2023);

        const calendarObj = await this.calendarModel.create(newCalendar);
        return calendarObj;
    }

    async registerFunciToDay(funciId: string, day: string, month: number): Promise<Calendar> {
        console.log(funciId, month, day); // Register info

        const daySelected = await this.findDayByMonthAndDay(month, day);
        const selectedDayObject = registerDayValidation(daySelected, day, funciId);

        selectedDayObject.listFunci.push(funciId);

        daySelected.markModified('days');
        await daySelected.save();

        await this.addDayToFunci(funciId, day);

        return daySelected;
    }

    async removeFunciFromDay(funciId: string, day: string, month: number): Promise<Calendar> {
        console.log(funciId, month, day); // Remove info
        const daySelected = await this.findDayByMonthAndDay(month, day);
        const selectedDayObject = removeDayValidation(daySelected, day, funciId);

        selectedDayObject.listFunci = selectedDayObject.listFunci.filter((id) => id !== funciId);

        daySelected.markModified('days');
        await daySelected.save();

        await this.removeDayFromFunci(funciId, day);

        return daySelected;
    }

    private async findDayByMonthAndDay(month: number, day: string): Promise<CalendarDocument> {
        const daySelected = await this.calendarModel
            .findOne({
                monthIntRef: month,
                'days.day': day
            })
            .exec();
        if (!daySelected) {
            throw new NotFoundException('Day not found.');
        }

        return daySelected;
    }

    private async addDayToFunci(funciId: string, day: string): Promise<Funci> {
        const funci = await this.funciModel.findOne({ matricula: funciId }).exec();

        if (!funci) {
            throw new NotFoundException('Funci not found.');
        }

        if (funci.dias_em_casa.length >= 7) {
            throw new BadRequestException('Funci already selected 7 days');
        }
        funci.dias_em_casa.push(day);
        await funci.save();

        return funci;
    }
    private async removeDayFromFunci(funciId: string, day: string): Promise<Funci> {
        const funci = await this.funciModel.findOne({ matricula: funciId }).exec();

        if (!funci) {
            throw new NotFoundException('Funci not found.');
        }

        if (!funci.dias_em_casa.includes(day)) {
            throw new BadRequestException('Days is not in the list.');
        }
        funci.dias_em_casa = funci.dias_em_casa.filter((item) => item !== day);
        await funci.save();

        return funci;
    }
}
