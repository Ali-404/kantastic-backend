import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, JwtService,UsersService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
