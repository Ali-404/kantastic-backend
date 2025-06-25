
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import SignUpDTO from 'src/auth/dto/signup.dto';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {

    constructor(private readonly _prismaService: PrismaService){}
    

    async findUserByUsername(username: string){
        return await this._prismaService.user.findUnique({where: {username}})
    }

    async isEmailUsed(email: string){
        return await this._prismaService.user.count({where: {email}}) > 0
    }

    async isUsernameUsed(username: string){
        return await this._prismaService.user.count({where: {username}}) > 0
    }

    async createUser({email,password,username}: SignUpDTO): Promise<User>{
        // hash password
        const hashedPassword = await bcrypt.hash(password,10)
        return await this._prismaService.user.create({data: {
            email,
            username,    
            password: hashedPassword
        
        } })
    }
    

}
