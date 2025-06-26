import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {

    constructor(private readonly _gateway: NotificationsGateway, private readonly _prisma: PrismaService) {}


    async notify(notifiable_id: number, content: string,type?: NotificationType ){
        
        if (!await this._prisma.user.findUnique({where: {id: Number(notifiable_id)}})){
            throw new BadRequestException("There is no user with id " + notifiable_id)
        }

        // save to db
        const notification = await this._prisma.notification.create({data: {
            notifiable_id: Number(notifiable_id),
            content,
            type,
        }})

 
        // gateway
        this._gateway.emitNotificationToUser(Number(notifiable_id),notification )

        return notification


    }


    async markAsRead(id: number){
        return (await this._prisma.notification.findUnique({where: {id}})).read = true
    }


    async getNotifications(notifiable_id: number){
        return await this._prisma.notification.findMany({where: {notifiable_id},orderBy: {
            createdAt: "desc"
        }})
    }
    
}
