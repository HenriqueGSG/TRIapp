import { Body, Controller, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { FunciService } from './funci.service';
import { Funci } from './schemas/funci.schema';
import { CreateFunciDto } from './dto/create-funci.dto';

@Controller('funci')
export class FunciController {

    constructor(private funciService: FunciService) { }


    @Get()
    async getAllFuncis(): Promise<Funci[]> {
        return this.funciService.findAll()
    }

    @Post()
    async createFunci(
        @Body()
        funci: CreateFunciDto
    ): Promise<Funci> {
        return this.funciService.create(funci)
    }


    @Get(':matricula')
    async getFunci(
        @Param('matricula')
        matricula: string
    ): Promise<Funci> {
        return this.funciService.findByMatricula(matricula)
    }

    @Patch(':matricula/add-day/:newDay')
    async addDay(
        @Param('matricula')
        matricula: string,
        @Param('newDay')
        newDay: string
    ): Promise<Funci> {

        try {

            return await this.funciService.addDay(matricula, newDay);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }
    @Patch(':matricula/remove-day/:dayToRemove')
    async removeDay(
        @Param('matricula')
        matricula: string,
        @Param('dayToRemove')
        dayToRemove: string
    ): Promise<Funci> {

        try {
            console.log(dayToRemove)
            return await this.funciService.removeDay(matricula, dayToRemove);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw error;
        }
    }

}
