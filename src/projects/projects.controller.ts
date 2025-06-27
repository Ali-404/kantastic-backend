import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import AuthGuard from 'src/auth/guards/auth.guard';
import { ProjectsService } from './projects.service';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateProjectDto from './dto/create-project.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import EnsureProjectIsMineGuard from './guards/EnsureProjectIsMine.guard';
import EditProjectDto from './dto/edit-project.dto';

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


    @UseGuards(AuthGuard,EnsureProjectIsMineGuard)
    @Put('edit/:id')
    async edit(@Body() dto: EditProjectDto, @Param("id", ParseIntPipe) id: number) {
        return await this._projectService.edit(id, dto);
    }

    @UseGuards(AuthGuard, EnsureProjectIsMineGuard)
    @Delete('delete/:id')
    delete(@Param("id", ParseIntPipe) id: number) {
        return this._projectService.delete(id);
    }

 

}
