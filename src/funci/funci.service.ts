import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Funci } from './schemas/funci.schema';
import * as  mongoose from 'mongoose';
@Injectable()
export class FunciService {


    constructor(
        @InjectModel(Funci.name)
        private funciModel: mongoose.Model<Funci>

    ) { }


    async findAll(): Promise<Funci[]> {
        const funcis = await this.funciModel.find()

        return funcis
    }


    async create(funci: Funci): Promise<Funci> {
        const res = await this.funciModel.create(funci)
        return res
    }
    async findByMatricula(matricula: string): Promise<Funci> {

        const pipeline = [
            {
                $match: { matricula },
            },
            {
                $addFields: {
                    selectedDaysCount: {
                        $size: "$dias_em_casa",
                    },
                }

            },
        ]
        const funci = await this.funciModel.aggregate(pipeline).exec()

        if (!funci) {
            throw new NotFoundException('Funci not found.')
        }
        return funci[0]
    }
    async addDay(matricula: string, newDay: string): Promise<Funci> {
        console.log('here', newDay)
        const funci = await this.funciModel.findOne({ matricula }).exec()

        if (!funci) {
            throw new NotFoundException('Funci not found.')
        }
        funci.dias_em_casa.push(newDay)
        await funci.save()

        return funci
    }
    async removeDay(matricula: string, dayToRemove: string): Promise<Funci> {
        console.log('here', dayToRemove)


        const funci = await this.funciModel.findOne({ matricula }).exec()
        if (!funci) {
            throw new NotFoundException('Funci not found.')
        }

        const oldDayArray = funci.dias_em_casa
        const newDayArray = funci.dias_em_casa.filter((value) => value !== dayToRemove)

        if (oldDayArray === newDayArray) {
            throw new NotFoundException('Day not found.')
        }

        funci.dias_em_casa = newDayArray
        await funci.save()

        return funci
    }
}
