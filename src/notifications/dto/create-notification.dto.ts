import { NotificationType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";


export default class CreateNotificationDTO {
    
    @IsOptional()
    @IsEnum(NotificationType)
    notificationType: NotificationType

    @IsNotEmpty()
    @IsString()
    content: string 

    
    @IsNotEmpty()
    notifiable_id: number

}