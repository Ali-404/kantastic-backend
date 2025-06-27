import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
  imports: [
      MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "..","uploads"),
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${file.fieldname}-${uniqueSuffix}${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only images allowed'), false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule {}
