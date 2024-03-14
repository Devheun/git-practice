import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findByField(option : FindOneOptions<UserDTO>) : Promise<UserDTO | undefined>{
    return await this.userRepository.findOne(option);
  }

  async save(userDTO : UserDTO) : Promise<UserDTO | undefined>{
    return await this.userRepository.save(userDTO);
  }
}
