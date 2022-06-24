import { Collection } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isDateInCurrentMonth, isDateInCurrentWeek, isToday } from '@shared';

import { ProjectRepository } from '../../data-access/entities/project/project.repository';
import { TeamSettingsRepository } from '../../data-access/entities/team-settings/team-settings.repository';
import { TeamRepository } from '../../data-access/entities/team/team.repository';
import { UserRepository } from '../../data-access/entities/user/user.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { ITeamSettings } from '../../domain/team-settings/team-settings.interface';
import { Team } from '../dtos/team.dto';
import { AmountOfWorkDone, User, UserCreate } from '../dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly teamRepository: TeamRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly teamSettingsRepository: TeamSettingsRepository
  ) {}
  async create(data: UserCreate) {
    const user = await this.userRepository.createUser(data.username, data.password);
    const project = this.projectRepository.create({ name: `Project ${data.username}` });
    const team = this.teamRepository.create({
      name: `Team ${user.username}`,
      users: [user],
      projects: [project],
    });

    this.userRepository.persist(user);
    this.projectRepository.persist(project);
    this.teamRepository.persist(team);

    await this.userRepository.flush();

    return mapToDto(user, User);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ id });
    if (user) {
      await user.tasks.init();
      return await mapToDto(user, User);
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return Promise.all(users.map((x) => mapToDto(x, User)));
  }

  async addTeam(userId: User['id'], teamId: Team['id']) {
    const dbUser = await this.userRepository.findOne({ id: userId });
    const dbTeam = await this.teamRepository.findOne({ id: teamId });
    if (dbUser && dbTeam) {
      dbUser.teams.add(dbTeam);
      await this.userRepository.persistAndFlush(dbUser);
      return mapToDto(dbUser, User);
    }
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  async getUserTeams(userId: User['id']) {
    const dbUser = await this.userRepository.findOne({ id: userId });
    if (dbUser) {
      await dbUser.teams.init();
      return await Promise.all(dbUser.teams.getItems().map((x) => mapToDto(x, Team)));
    }
    throw new NotFoundException(`User with id ${userId} not found`);
  }

  async getAmountOfWorkDone(userId: User['id']): Promise<AmountOfWorkDone> {
    const dbUser = await this.userRepository.findOne({ id: userId });
    if (!dbUser) throw new NotFoundException(`User with id ${userId} not found`);
    await dbUser.teams.init();
    await dbUser.tasks.init();

    const teamsSettings = await Promise.all(
      dbUser.teams
        .getItems()
        .map((x) => x.teamSettings)
        .filter((x): x is ITeamSettings => !!x)
        .map(async (x) => await this.teamSettingsRepository.findOne({ id: x.id }))
    );

    const averageWorkHours =
      teamsSettings.map((teamSettings) => teamSettings?.workHours ?? 0).reduce((a, b) => a + b, 0) /
      teamsSettings.length;

    const averageWorkDays =
      teamsSettings.map((teamSettings) => teamSettings?.weekDays ?? 0).reduce((a, b) => a + b, 0) /
      teamsSettings.length;

    console.log(teamsSettings);
    const workedHoursToday = dbUser.tasks
      .getItems()
      .filter((task) => isToday(task.date))

      .map((task) => {
        console.log(task, task.duration / (1000 * 60 * 60));
        return task.duration / (1000 * 60 * 60);
      })
      .reduce((a, b) => a + b, 0);

    const workedHoursThisWeek = dbUser.tasks
      .getItems()
      .filter((task) => isDateInCurrentWeek(task.date))
      .map((task) => task.duration / (1000 * 60 * 60))
      .reduce((a, b) => a + b, 0);

    const workedHoursThisMonth = dbUser.tasks
      .getItems()
      .filter((task) => isDateInCurrentMonth(task.date))
      .map((task) => task.duration / (1000 * 60 * 60))
      .reduce((a, b) => a + b, 0);

    const amountOfWorkDone: AmountOfWorkDone = {
      today: workedHoursToday,
      week: workedHoursThisWeek,
      month: workedHoursThisMonth,
      todayPercentage: 100 * (workedHoursToday / averageWorkHours),
      weekPercentage: 100 * (workedHoursThisWeek / (averageWorkHours * averageWorkDays)),
      monthPercentage: 100 * (workedHoursThisMonth / (averageWorkHours * averageWorkDays * 4)),
    };

    return amountOfWorkDone;
  }

  async awayTeamMembers(userId: string) {
    const dbUser = await this.userRepository.findOne({ id: userId });
    if (!dbUser) throw new NotFoundException(`User with id ${userId} not found`);
    await dbUser.teams.init();

    const members = await Promise.all(
      dbUser.teams
        .getItems()
        .map(async (x) => {
          let users = x.users;
          if (users instanceof Collection) {
            await users.init();
            users = users.getItems();
          }
          return users.map((y) => y.id);
        })
        .map(async (ids) => [...new Set(await ids)].map(async (id) => await this.userRepository.findOne({ id })))
        .map(async (users) => {
          return await Promise.all(await users);
        })
    );

    return (
      await Promise.all(
        members.flat().map(async (user) => {
          if (user?.timeOffs) {
            await user.timeOffs.init();
            if (user.timeOffs.getItems().find((timeOff) => isToday(timeOff.startDate)))
              return await mapToDto(user, User);
          }
        })
      )
    ).filter((x): x is User => !!x);
  }
}
