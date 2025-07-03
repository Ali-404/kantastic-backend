import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import CreateTaskDto from './dto/create-task.dto';
import AuthGuard from 'src/auth/guards/auth.guard';

@Controller('tasks')
export class TasksController {
    
    constructor(private readonly tasksService: TasksService) {}

    @UseGuards(AuthGuard)
    @Post()
    async store(@Body() dto: CreateTaskDto) {
        const { content,assigneeIds } = dto;
        return await this.tasksService.create(content, assigneeIds);
    }

}
