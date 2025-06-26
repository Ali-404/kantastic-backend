import { Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/auth/guards/auth.guard';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly _projectService: ProjectsService) {}

    // crud routes
    
    @UseGuards(AuthGuard)
    @Get()
    index(@Req() req: Request) {

        const userId = req["user"].sub;
        return this._projectService.findAll(userId);


    }

    @UseGuards(AuthGuard)
    @Get(':id')
    show(@Param("id", ParseIntPipe) id: number) {
        return this._projectService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Get('create')
    create(){
    }


    @UseGuards(AuthGuard)
    @Get('edit/:id')
    edit(){
    }

    @UseGuards(AuthGuard)
    @Get('delete/:id')
    delete(){
    
    }

    @UseGuards(AuthGuard)
    @Post('restore/:')
    restore(){
    }


}
