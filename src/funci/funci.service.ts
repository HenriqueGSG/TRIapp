import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Funci } from './schemas/funci.schema';
import * as mongoose from 'mongoose';
import { generateCalendar } from 'src/utils/utils';
@Injectable()
export class FunciService {
  constructor(
    @InjectModel(Funci.name)
    private funciModel: mongoose.Model<Funci>
  ) { }

  async findAll(): Promise<Funci[]> {
    const funcis = await this.funciModel.find();
    // Example usage
    const result = generateCalendar(11, 2023);
    console.log(result);
    return funcis;
  }

  async create(funci: Funci): Promise<Funci> {
    const res = await this.funciModel.create(funci);
    return res;
  }
  async findByMatricula(funciId: string): Promise<Funci> {
    const pipeline = [
      {
        $match: { funciId }
      },
      {
        $addFields: {
          selectedDaysCount: {
            $size: '$homeDays'
          }
        }
      }
    ];
    const funci = await this.funciModel.aggregate(pipeline).exec();

    if (!funci[0]) {
      throw new NotFoundException('Funci not found.');
    }
    console.log(funci[0])
    return funci[0];
  }
  async addDay(funciId: string, newDay: string): Promise<Funci> {
    console.log('here', newDay);
    const funci = await this.funciModel.findOne({ funciId }).exec();

    if (!funci) {
      throw new NotFoundException('Funci not found.');
    }
    funci.homeDays.push(newDay);
    await funci.save();

    return funci;
  }
  async removeDay(funciId: string, dayToRemove: string): Promise<Funci> {
    console.log('here', dayToRemove);

    const funci = await this.funciModel.findOne({ funciId }).exec();
    if (!funci) {
      throw new NotFoundException('Funci not found.');
    }

    const oldDayArray = funci.homeDays;
    const newDayArray = funci.homeDays.filter(
      (value) => value !== dayToRemove
    );

    if (oldDayArray.length === newDayArray.length) {
      throw new NotFoundException('Day not found.');
    }

    funci.homeDays = newDayArray;
    await funci.save();

    return funci;
  }
}
