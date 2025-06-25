import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: "1h"
        }
    }),
    PrismaModule, UsersModule, AuthModule],
})
export class AppModule {}
