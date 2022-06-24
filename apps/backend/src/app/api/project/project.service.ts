import { Injectable, NotFoundException } from '@nestjs/common';

import { ProjectRepository } from '../../data-access/entities/project/project.repository';
import { TeamRepository } from '../../data-access/entities/team/team.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { Project, ProjectCreate } from '../dtos/project.dto';
import { Team } from '../dtos/team.dto';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository, private teamRepository: TeamRepository) {}
  async create(data: ProjectCreate) {
    const project = this.projectRepository.create(data);
    await this.projectRepository.persistAndFlush(project);
    return mapToDto(project, Project);
  }

  async delete(id: string) {
    const team = await this.projectRepository.findOne({ id });
    if (team) return await this.projectRepository.removeAndFlush(team);
    throw new NotFoundException(`Project with id ${id} not found`);
  }

  async findById(id: string) {
    const project = await this.projectRepository.findOne({ id });
    if (project) return mapToDto(project, Project);
    throw new NotFoundException(`Project with id ${id} not found`);
  }

  async findAll() {
    const projects = await this.projectRepository.findAll();
    return await Promise.all(projects.map((x) => mapToDto(x, Project)));
  }

  async addTeam(projectId: Project['id'], teamId: Team['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbProject = await this.projectRepository.findOne({ id: projectId });
    if (dbTeam && dbProject) {
      await dbProject.teams.init();
      dbProject.teams.add(dbTeam);

      await this.teamRepository.persistAndFlush(dbProject);
      return mapToDto(dbProject, Project);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }

  async removeTeam(projectId: Project['id'], teamId: Team['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbProject = await this.projectRepository.findOne({ id: projectId });
    if (dbTeam && dbProject) {
      await dbProject.teams.init();

      dbProject.teams.remove(dbTeam);
      await this.teamRepository.persistAndFlush(dbProject);

      return mapToDto(dbProject, Project);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }
}
