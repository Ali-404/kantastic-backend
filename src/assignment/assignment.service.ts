import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssignmentService {
    
    constructor(private readonly prisma:PrismaService){}
        
    
    //create assignment
    async assignTaskToUser(task: number, userId: number, assignedBy?: number) {
        // check if its already assigned to it
        if (await this.prisma.assignment.count({
            where: {
                taskId: task,
                assignedToId: userId,
            },
        }) > 0) {
            throw new Error('Task is already assigned to this user');
        }
        
        return await this.prisma.assignment.create({
            data: {
                taskId: task,
                assignedToId: userId,
                assignedById: assignedBy,
            },
        });
    }
}
