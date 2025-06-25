import {  BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import SignUpDTO from './dto/signup.dto';

type IAuthData = {
    username: string,
    password: string
}

export type IJWTPayload = {
    username: string,
    sub: number
}

@Injectable()
export class AuthService {

    constructor(private readonly _usersService: UsersService, private readonly _jwtService: JwtService){}
    // validate
    async validateUser({username, password}: IAuthData){
        const user = await this._usersService.findUserByUsername(username)
        if (!user || !await bcrypt.compare(password, user.password)){
            throw new UnauthorizedException("Invalid Credentials")
        }

        // add more validation rules later
        return user        
    }


    async signIn(signInData: IAuthData){
        // validate
        const user = await this.validateUser(signInData)

        // generate token
        const payload: IJWTPayload = {username: user.username, sub: user.id}

        return {
            message: "Welcome back " + user.username,
            access_token: this._jwtService.sign(payload, {
                secret: process.env.JWT_SECRET
            })
        }
        
    }


    async signUp(dto : SignUpDTO){
        const {email,password,password_confirmation,username} = dto;
        // check for other user with same data
        if (await this._usersService.isEmailUsed(email)){
            throw new BadRequestException("Email Already taken ! Try another one")
        }

        if (await this._usersService.isUsernameUsed(username)){
            throw new BadRequestException("Username Already taken ! Try another one")
        }

        if (password !== password_confirmation){
            throw new BadRequestException("Wrong password confirmation !")
        }
        
        // create the user
        const user = await this._usersService.createUser(dto)

        return {
            message: "You have signed up with success.",
            user
        }

    }

    async user(username: string){
        const _user =  await this._usersService.findUserByUsername(username)
        if (!_user){
            throw new NotFoundException("Something went wrong !")
        }
        return _user
    }


    async logout(req: Request){
       req["user"] = null
       return true 
    }   


}
