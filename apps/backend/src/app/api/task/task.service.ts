import { NotFoundError } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ProjectRepository } from '../../data-access/entities/project/project.repository';
import { TaskRepository } from '../../data-access/entities/task/task.repository';
import { UserRepository } from '../../data-access/entities/user/user.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { Task, TaskCreate, TaskDelete } from '../dtos/task.dto';
import { User } from '../dtos/user.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository
  ) {}
  async create(data: TaskCreate) {
    const user = await this.userRepository.findOne({ id: data.userId });
    const project = await this.projectRepository.findOne({ id: data.projectId });
    if (!user || !project)
      throw new NotFoundException(`User with id ${data.userId} or Project with id ${data.projectId} not found`);

    const task = this.taskRepository.create({ ...data, user, project });
    await this.taskRepository.persistAndFlush(task);
    return (await mapToDto(user, User)).tasks;

    // const dto = await mapToDto(user, User);
    // return await Promise.all(dto.tasks.map(async t =>await mapToDto(t, Task)) );
  }

  async delete(data: TaskDelete): Promise<Task[]> {
    const task = await this.taskRepository.findOne({ id: data.id });
    if (!task) throw new NotFoundException(`Task with id ${data.id} not found`);

    const userId = task.user.id;
    await this.taskRepository.removeAndFlush(task);
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);
    // return (await mapToDto(user, User)).tasks;

    const dto = await mapToDto(user, User);
    return await Promise.all(dto.tasks.map(async (t) => await mapToDto(t, Task)));
  }

  async findById(id: string) {
    const task = await this.taskRepository.findOne({ id });
    if (task) return mapToDto(task, Task);

    throw new NotFoundException(`Task with id ${id} not found`);
  }

  async findAll() {
    const tasks = await this.taskRepository.findAll();
    return await Promise.all(tasks.map((x) => mapToDto(x, Task)));
  }
}
