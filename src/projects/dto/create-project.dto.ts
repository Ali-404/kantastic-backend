import { IsOptional, IsString } from "class-validator";


export default class CreateProjectDto {


    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    
}