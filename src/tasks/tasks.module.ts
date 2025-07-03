import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AssignmentService } from 'src/assignment/assignment.service';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [AssignmentService],
})
export class TasksModule {}
