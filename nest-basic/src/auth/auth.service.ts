import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService
    ){}

    async registerUser(newUser : UserDTO) : Promise<UserDTO>{
        let userFind: UserDTO = await this.userService.findByField({where : {username : newUser.username}});

        if(userFind){ // 이미 존재하는 유저인 경우
            throw new HttpException('User already exists',HttpStatus.BAD_REQUEST);
        }
        return this.userService.save(newUser);
    }
}
