import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async registerAccount(@Body() userDTO : UserDTO) : Promise<any>{
        return await this.authService.registerUser(userDTO);
    }

    @Post('/login')
    async login(@Body() userDTO : UserDTO) : Promise<any>{
        return await this.authService.validateUser(userDTO);
    }
}
