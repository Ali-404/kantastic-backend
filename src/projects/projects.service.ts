import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {

    constructor(private readonly _prisma: PrismaService) {}


    findAll(userId: number) {
        return this._prisma.project.findMany({
            where: {
                OR: [
                    {
                        adminId: userId
                    },
                    {
                       userProjects: {
                        some: {
                            userId: userId
                        }
                       }, 
                    },
                ]
            },
            include: {
                admin: true,
                userProjects: true,
                _count: true,
            }
        });
    }


    findOne(id: number) {
        return this._prisma.project.findUniqueOrThrow({
            where: { id: id },
            include: {
                admin: true,
                userProjects: true,
            }
        });
    }


    findUserProjects(userId: number, withCount: boolean = true) {
        return this._prisma.project.findMany({where: {adminId: userId}, include:{
            userProjects:true,
            admin:true,
            _count: withCount,
        }})
    }


    findAssignedProjects(userId: number,withCount: boolean = true) {
        return  this._prisma.project.findMany({
            where: {
                userProjects: {
                    some: {
                        userId: userId
                    }
                }
            },
            include: {
                userProjects: true,
                admin: true,
                _count: withCount,
            }
        });
    }


}
