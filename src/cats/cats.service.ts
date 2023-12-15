import { Model, Document } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './cats.interface';




@Injectable()
export class CatsService {
    constructor(
        @Inject('CAT_MODEL')
        private catModel: Model<Cat>,
    ) { }


    async create(cat: any): Promise<Cat> {
        const createdCat = new this.catModel(cat);
        return createdCat.save();
    }
    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }
}