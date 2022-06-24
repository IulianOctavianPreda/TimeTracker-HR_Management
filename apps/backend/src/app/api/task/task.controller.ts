import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Task, TaskCreate, TaskDelete } from '../dtos/task.dto';
import { TaskService } from '../task/task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('create')
  async createTask(@Body() data: TaskCreate): Promise<Task[]> {
    return await this.taskService.create(data);
  }

  @Post('delete')
  async deleteTask(@Body() data: TaskDelete): Promise<Task[]> {
    return await this.taskService.delete(data);
  }

  @Get(':id')
  async getTask(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return await this.taskService.findById(id);
  }

  @Get('tasks')
  async getTasks(): Promise<Task[]> {
    return await this.taskService.findAll();
  }
}
