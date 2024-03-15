import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { username: newUser.username },
    });

    if (userFind) {
      // 이미 존재하는 유저인 경우
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    return this.userService.save(newUser);
  }

  async validateUser(user: UserDTO): Promise<string | undefined> {
    const userFind: UserDTO = await this.userService.findByField({
      where: { username: user.username },
    });
    const validatePassword = await bcrypt.compare(user.password, userFind.password);
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    return 'login successful!';
  }
}
