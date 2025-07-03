import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import TaskStatus from './enum/TaskStatus.enum';
import { AssignmentService } from 'src/assignment/assignment.service';
import { Task } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private readonly prisma:PrismaService,private readonly _assignmentSer: AssignmentService){}
    
    
    //create task
    async create(content: string, assigneeIds: number[] = [],createdBy?:number|null ,status:TaskStatus = TaskStatus.TODO): Promise<Task> {
        let createdByUser = null;

        if (createdBy){
            createdByUser = await this.prisma.user.findUnique({where: {id: createdBy}});
            if (!createdByUser) {
                throw new BadRequestException('User does not exist');
            }
        }
        //check first if the users exists
        const usersCount = await this.prisma.user.count({
            where: {
                id: {
                    in: assigneeIds
                }
            }
        });
        if(usersCount !== assigneeIds.length) {
            throw new BadRequestException('One or more users do not exist');
        }
        // create task 
        const task = await this.prisma.task.create({
            data: {
                content,
                status,
                createdById:createdBy,
            }
        })

        // create assignments for the task
        if (assigneeIds.length > 0) {
            assigneeIds.forEach(async (assigneeId) => {
                if (!await this._assignmentSer.assignTaskToUser(task.id,assigneeId,createdBy)) {
                    throw new BadRequestException('Error assigning task to user');
                }

            })
        }

        return task;

    }
    //edit task


    //edit task status

    //delete task

    
}
