import { IsOptional, IsString } from "class-validator";


export default class EditProjectDto {


    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    
}