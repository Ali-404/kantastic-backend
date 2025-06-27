import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import AuthGuard from 'src/auth/guards/auth.guard';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateProjectDto from './dto/create-project.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @UseInterceptors(FileInterceptor("cover", {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, uniqueSuffix + extname(file.originalname));
            }
        })
    }))
    @Post('create')
    async store(@Req() req: Request,@Body() dto:CreateProjectDto,@UploadedFile() cover: Express.Multer.File){
        if (!cover){
            throw new Error("test")
        }
        return await this._projectService.create(dto, req["user"].sub, cover);

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
