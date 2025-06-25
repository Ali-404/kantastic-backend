import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export default class SignUpDTO {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsEmail()
    email: string

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers:1,
        minUppercase:1,
        minSymbols: 1
    })
    password: string

    @IsNotEmpty()
    @IsString()
    password_confirmation: string
}