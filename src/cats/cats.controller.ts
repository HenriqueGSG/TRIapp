import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './cats.interface';


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Get()
    async getAllCats(): Promise<Cat[]> {
        console.log('heree')
        return this.catsService.findAll();
    }
    @Post()
    async create(
        @Body()
        cat: Cat
    ): Promise<Cat> {
        console.log('heree')
        return this.catsService.create(cat);
    }

}
