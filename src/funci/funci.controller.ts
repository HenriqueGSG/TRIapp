import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { FunciService } from './funci.service';
import { Funci } from './schemas/funci.schema';
import { CreateFunciDto } from './dto/create-funci.dto';

@Controller('funci')
export class FunciController {
  constructor(private funciService: FunciService) { }

  @Get()
  async getAllFuncis(): Promise<Funci[]> {
    return this.funciService.findAll();
  }

  @Post()
  async createFunci(
    @Body()
    funci: CreateFunciDto
  ): Promise<Funci> {
    return this.funciService.create(funci);
  }

  @Get(':funciId')
  async getFunci(
    @Param('funciId')
    funciId: string
  ): Promise<Funci> {
    return this.funciService.findByMatricula(funciId);
  }

  @Patch(':funciId/add-day/:newDay')
  async addDay(
    @Param('funciId')
    funciId: string,
    @Param('newDay')
    newDay: string
  ): Promise<Funci> {
    try {
      return await this.funciService.addDay(funciId, newDay);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
  @Patch(':funciId/remove-day/:dayToRemove')
  async removeDay(
    @Param('funciId')
    funciId: string,
    @Param('dayToRemove')
    dayToRemove: string
  ): Promise<Funci> {
    try {
      console.log(dayToRemove);
      return await this.funciService.removeDay(funciId, dayToRemove);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
