import { CanActivate, ExecutionContext,  Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ProjectsService } from "../projects.service";

@Injectable()
export default class EnsureProjectIsMineGuard implements CanActivate{
    
    constructor(private readonly _projectsService: ProjectsService) {}
    
    async canActivate(context: ExecutionContext) {
        
        const request = context.switchToHttp().getRequest();
        const user_id = request["user"]?.sub;
        const project_id = Number(request.params.id);
        const project = await this._projectsService.getProjectAdmin(project_id);
        
        if (!project) {
            throw new NotFoundException("Project not found");
        }

        if (project.adminId !== user_id) {
            throw new UnauthorizedException("You are not the owner of this project");
        }
        
        return true;
        

    }
}