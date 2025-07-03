import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Module({
    providers: [AssignmentService],
    exports: [AssignmentService],
    imports: [],
    
})
export class AssignmentModule {}
