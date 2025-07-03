import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export default class CreateTaskDto {

    @IsString()
    content: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    assigneeIds: number[];
}