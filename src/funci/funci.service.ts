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
        const pipeline = [
            // Sua etapa de agregação aqui...
        ];

        return funcis
    }


    async create(funci: Funci): Promise<Funci> {
        const res = await this.funciModel.create(funci)
        return res
    }
    async findByMatricula(matricula: string): Promise<Funci> {

        const funci = await this.funciModel.findOne({ matricula }).exec()

        if (!funci) {
            throw new NotFoundException('Funci not found.')
        }
        return funci
    }
    async addDay(matricula: string, newDay: string): Promise<Funci> {
        console.log('here')
        const funci = await this.funciModel.findOne({ matricula }).exec()

        if (!funci) {
            throw new NotFoundException('Funci not found.')
        }
        funci.dias_em_casa.push(newDay)
        await funci.save()

        return funci
    }
}
