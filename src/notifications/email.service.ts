import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

    constructor(private readonly _mailer: MailerService){}
    
    
}
