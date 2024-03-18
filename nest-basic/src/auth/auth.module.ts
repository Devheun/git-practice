import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports : [TypeOrmModule.forFeature([UserRepository]),
  JwtModule.register({
    secret: 'jwt-secret-key',
    signOptions: { expiresIn: '300s' },
  }),],
  exports: [TypeOrmModule],
  providers: [AuthService,UserService,UserRepository],
  controllers: [AuthController]
})
export class AuthModule {}
