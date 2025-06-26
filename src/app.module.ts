import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsModule } from './notifications/notifications.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [

    MailerModule.forRoot({
        transport: {
          host: "localhost",
          port: 1025,
          ignoreTLS: true,
        },
        defaults: {
          from: '"Kantastic" <noreply.kantastic@localhost>',
      },
      template: {
        dir: join(__dirname, 'emails'), 
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),


    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: "3h"
        }
    }),
    PrismaModule, UsersModule, AuthModule, NotificationsModule, ProjectsModule],
})
export class AppModule {}
