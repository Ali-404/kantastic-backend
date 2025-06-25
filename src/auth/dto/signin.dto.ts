import {   IsString } from "class-validator";


export default class SignInDTO {
    @IsString()
    username: string

    @IsString()
    password: string
}