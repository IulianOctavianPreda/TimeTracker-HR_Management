import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Project, ProjectCreate } from '../dtos/project.dto';
import { ProjectService } from '../project/project.service';

@ApiTags('project')
@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('create')
  async createProject(@Body() data: ProjectCreate): Promise<Project> {
    return await this.projectService.create(data);
  }

  @Get(':id')
  async getProject(@Param('id', ParseUUIDPipe) id: string): Promise<Project> {
    return await this.projectService.findById(id);
  }

  @Post(':id')
  async deleteProject(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.projectService.delete(id);
  }

  @Get('projects')
  async getProjects(): Promise<Project[]> {
    return await this.projectService.findAll();
  }

  @Post(':id/addTeam/:teamId')
  async addTeam(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('teamId', ParseUUIDPipe) teamId: string
  ): Promise<Project> {
    return await this.projectService.addTeam(id, teamId);
  }

  @Post(':id/removeTeam/:teamId')
  async removeTeam(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('teamId', ParseUUIDPipe) teamId: string
  ): Promise<Project> {
    return await this.projectService.removeTeam(id, teamId);
  }
}
