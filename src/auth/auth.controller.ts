import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import SignInDTO from './dto/signin.dto';
import { AuthService, IJWTPayload } from './auth.service';
import SignUpDTO from './dto/signup.dto';
import AuthGuard from './guards/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService){}

    @Post("login")
    async login(@Body() dto: SignInDTO){
        return await this._authService.signIn(dto)
    }

    @Post("register")
    async register(@Body() dto: SignUpDTO){
        return await this._authService.signUp(dto)
    }

    @UseGuards(AuthGuard)
    @Post("logout")
    logout(@Req() req: Request){
        req["user"] = null
        return {
            message: "See you later !"
        }
    }


    @UseGuards(AuthGuard)
    @Get("user")
    user(@Req() req: Request){
        const username = (req["user"] as IJWTPayload).username   
        return this._authService.user(username)
    }   
    
    

}
