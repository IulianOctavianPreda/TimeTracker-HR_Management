import { Collection } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { asyncMap } from '@shared';

import { ProjectRepository } from '../../data-access/entities/project/project.repository';
import { TeamSettingsRepository } from '../../data-access/entities/team-settings/team-settings.repository';
import { TeamRepository } from '../../data-access/entities/team/team.repository';
import { UserRepository } from '../../data-access/entities/user/user.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { Project } from '../dtos/project.dto';
import { Team, TeamCreate } from '../dtos/team.dto';
import { TimeOff } from '../dtos/time-off.dto';
import { User } from '../dtos/user.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly teamSettingsRepository: TeamSettingsRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository
  ) {}
  async create(userId: string, data: TeamCreate) {
    const team = await this.teamRepository.createTeam(userId, data, this.userRepository, this.teamSettingsRepository);
    await this.teamRepository.persistAndFlush(team);
    return mapToDto(team, Team);
  }

  async findById(id: string) {
    const team = await this.teamRepository.findOne({ id });
    if (team) return mapToDto(team, Team);
    throw new NotFoundException(`Team with id ${id} not found`);
  }

  async delete(id: string) {
    const team = await this.teamRepository.findOne({ id });
    if (team) return await this.teamRepository.removeAndFlush(team);
    throw new NotFoundException(`Team with id ${id} not found`);
  }

  async findAll() {
    const teams = await this.teamRepository.findAll();
    return await Promise.all(teams.map((x) => mapToDto(x, Team)));
  }

  async addUser(teamId: Team['id'], userId: User['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbUser = await this.userRepository.findOne({ id: userId });
    if (dbTeam && dbUser) {
      dbTeam.users.add(dbUser);
      await this.teamRepository.persistAndFlush(dbTeam);
      return mapToDto(dbTeam, Team);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }

  async removeUser(teamId: Team['id'], userId: User['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbUser = await this.userRepository.findOne({ id: userId });
    if (dbTeam && dbUser) {
      await dbTeam.users.init();
      dbTeam.users.remove(dbUser);
      await this.teamRepository.persistAndFlush(dbTeam);
      return mapToDto(dbTeam, Team);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }

  async addProject(teamId: Team['id'], projectId: Project['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbProject = await this.projectRepository.findOne({ id: projectId });
    if (dbTeam && dbProject) {
      await dbTeam.projects.init();
      dbTeam.projects.add(dbProject);

      await this.teamRepository.persistAndFlush(dbTeam);
      return mapToDto(dbTeam, Team);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }

  async removeProject(teamId: Team['id'], projectId: Project['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    const dbProject = await this.projectRepository.findOne({ id: projectId });
    if (dbTeam && dbProject) {
      await dbTeam.projects.init();

      dbTeam.projects.remove(dbProject);
      await this.teamRepository.persistAndFlush(dbTeam);

      return mapToDto(dbTeam, Team);
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }

  async getTeamTimeOff(teamId: Team['id']) {
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    if (dbTeam) {
      await dbTeam.users.init();
      const timeOffs = (
        await asyncMap(dbTeam.users.getItems(), async (user) => {
          let timeOffs = user.timeOffs;
          if (timeOffs instanceof Collection) {
            await timeOffs.init();
            timeOffs = timeOffs.toArray();
          }
          return timeOffs;
        })
      ).flat();
      return await Promise.all(timeOffs.map((x) => mapToDto(x, TimeOff)));
    }

    throw new NotFoundException(`Team with id ${teamId} not found`);
  }
}
