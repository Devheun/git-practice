import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  async validateUser(
    userDTO: UserDTO,
  ): Promise<{ accessToken: string } | undefined> {
    const userFind: User = (await this.userService.findByField({
      where: { username: userDTO.username },
    })) as User; // 명시적으로 User 타입으로 선언
    const validatePassword = await bcrypt.compare(
      userDTO.password,
      userFind.password,
    );
    if (!userFind || !validatePassword) {
      throw new UnauthorizedException();
    }
    const payload = { id: userFind.id, username: userFind.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
