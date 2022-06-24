import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Team, TeamCreate } from '../dtos/team.dto';
import { TimeOff } from '../dtos/time-off.dto';
import { TeamService } from '../team/team.service';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('create')
  async createTeam(@Param('id', ParseUUIDPipe) userId: string, @Body() data: TeamCreate): Promise<Team> {
    return await this.teamService.create(userId, data);
  }

  @Get(':id')
  async getTeam(@Param('id', ParseUUIDPipe) id: string): Promise<Team> {
    return await this.teamService.findById(id);
  }

  @Post(':id')
  async deleteTeam(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.teamService.delete(id);
  }

  @Get('teams')
  async getTeams(): Promise<Team[]> {
    return await this.teamService.findAll();
  }

  @Post(':id/addUser/:userId')
  async addUser(@Param('id', ParseUUIDPipe) id: string, @Param('userId', ParseUUIDPipe) userId: string): Promise<Team> {
    return await this.teamService.addUser(id, userId);
  }

  @Post(':id/removeUser/:userId')
  async removeUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<Team> {
    return await this.teamService.removeUser(id, userId);
  }

  @Post(':id/addProject/:projectId')
  async addProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('projectId', ParseUUIDPipe) projectId: string
  ): Promise<Team> {
    return await this.teamService.addProject(id, projectId);
  }

  @Post(':id/removeProject/:projectId')
  async removeProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('projectId', ParseUUIDPipe) projectId: string
  ): Promise<Team> {
    return await this.teamService.removeProject(id, projectId);
  }

  @Get(':id/timeoff')
  async getTeamTimeOff(@Param('id', ParseUUIDPipe) id: string): Promise<TimeOff[]> {
    return await this.teamService.getTeamTimeOff(id);
  }
}
