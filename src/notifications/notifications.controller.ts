import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/auth/guards/auth.guard';
import { NotificationsService } from './notifications.service';
import CreateNotificationDTO from './dto/create-notification.dto';

@Controller('notifications')
export class NotificationsController {

    constructor(private readonly _notificationService: NotificationsService ) {}
    @UseGuards(AuthGuard)
    @Get()
    async index(@Req() req:Request ){
        return await this._notificationService.getNotifications(req["user"].sub)
    }


    @UseGuards(AuthGuard)
    @Post()
    async pushNotification(@Body() {content,notifiable_id,notificationType}: CreateNotificationDTO){
        return await this._notificationService.notify(notifiable_id,content,notificationType)
    }

}
