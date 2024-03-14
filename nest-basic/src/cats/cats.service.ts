import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entity/cats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number) : Promise<Cat> {
    return this.catsRepository.findOne({
        where : {id}
    });
  }

  async create(cat : Cat) : Promise<void>{
    await this.catsRepository.save(cat);
  }

  async update(id : number, cat : Cat) : Promise<void>{
    const existCat = await this.catsRepository.findOne({where:{id}});
    if(existCat){
        existCat.age = cat.age;
        await this.catsRepository.save(existCat);
    }
  }

  async remove(id : number) : Promise<void>{
    await this.catsRepository.delete(id);
  }
}
