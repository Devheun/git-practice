import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from 'src/dto/user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService : AuthService) {}

    @Post('/register')
    async registerAccount(@Body() userDTO : UserDTO) : Promise<any>{
        return await this.authService.registerUser(userDTO);
    }

    @Post('/login')
    async login(@Body() userDTO : UserDTO, @Res() res: Response) : Promise<any>{
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
        return res.json(jwt);
    }
}
