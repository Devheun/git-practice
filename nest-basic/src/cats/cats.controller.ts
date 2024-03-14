import { Body, Controller, Get, Post, Query, Param, Put, Delete } from '@nestjs/common';
import { CreateCatDTO } from 'src/dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './entity/cats.entity';


@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Get()
    async findAll() : Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) : string {
        return `This action returns a #${id} cat`;
    }

    @Post()
    create(@Body() cat: Cat) {
        this.catsService.create(cat);
    }

    @Put(':id')
    update(@Param('id') id : number, @Body() cat : Cat){
        this.catsService.update(id, cat);
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    remove(@Param('id') id : number){
        this.catsService.remove(id);
        return `This action removes a #${id} cat`;
    }
}
