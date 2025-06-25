import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class AuthGuard implements CanActivate{

    constructor(private jwtService: JwtService) {}


    async canActivate(context: ExecutionContext) {
        // verify token
        const req = context.switchToHttp().getRequest()

        const token = this.extractTokenFromHeader(req)
        if (!token){
            req["user"] = null
            throw new UnauthorizedException("Please Sign In First !")
        }

        try {
            const payload =  await this.jwtService.verifyAsync(token, {secret: process.env.JWT_SECRET})
            req["user"] = payload
        }catch{
            req["user"] = null
            throw new UnauthorizedException()
        }

        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers["authorization"]?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}