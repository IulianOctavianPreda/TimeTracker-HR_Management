import { Body, Controller, Get, NotFoundException, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Public } from '../../auth/public-route.decorator';
import { Team } from '../dtos/team.dto';
import { AmountOfWorkDone, User, UserCreate } from '../dtos/user.dto';
import { UserService } from '../user/user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('create')
  async createUser(@Body() data: UserCreate): Promise<User> {
    return await this.userService.create(data);
  }

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.userService.findById(id);
    return user;
  }

  @Get('users')
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id/teams')
  async getUserTeams(@Param('id', ParseUUIDPipe) id: string): Promise<Team[]> {
    return await this.userService.getUserTeams(id);
  }

  @Post(':id/addTeam/:teamId')
  async addTeam(@Param('id', ParseUUIDPipe) id: string, @Param('teamId', ParseUUIDPipe) teamId: string): Promise<User> {
    return await this.userService.addTeam(id, teamId);
  }

  @Get(':id/amountOfWorkDone')
  async getAmountOfWorkDone(@Param('id', ParseUUIDPipe) id: string): Promise<AmountOfWorkDone> {
    return await this.userService.getAmountOfWorkDone(id);
  }

  @Get(':id/awayMembers')
  async getAwayMembers(@Param('id', ParseUUIDPipe) id: string): Promise<User[]> {
    return await this.userService.awayTeamMembers(id);
  }
}
