import { Injectable, NotFoundException } from '@nestjs/common';

import { TimeOffRepository } from '../../data-access/entities/time-off/time-off.repository';
import { UserRepository } from '../../data-access/entities/user/user.repository';
import { mapToDto } from '../../data-access/mapper/dto.mapper';
import { TimeOff, TimeOffCreate, TimeOffDelete } from '../dtos/time-off.dto';
import { User } from '../dtos/user.dto';

@Injectable()
export class TimeOffService {
  constructor(private readonly timeOffRepository: TimeOffRepository, private readonly userRepository: UserRepository) {}
  async create(data: TimeOffCreate) {
    const user = await this.userRepository.findOne({ id: data.userId });
    if (!user) throw new NotFoundException(`User with id ${data.userId}  not found`);

    const timeOff = this.timeOffRepository.create({ ...data, user });
    await this.timeOffRepository.persistAndFlush(timeOff);
    return (await mapToDto(user, User)).timeOffs;
  }

  async delete(data: TimeOffDelete): Promise<TimeOff[]> {
    const timeOff = await this.timeOffRepository.findOne({ id: data.id });
    if (!timeOff) throw new NotFoundException(`TimeOff with id ${data.id} not found`);

    const userId = timeOff.user.id;
    await this.timeOffRepository.removeAndFlush(timeOff);
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const dto = await mapToDto(user, User);
    return await Promise.all(dto.tasks.map(async (t) => await mapToDto(t, TimeOff)));
  }

  async findById(id: string) {
    const timeOff = await this.timeOffRepository.findOne({ id });
    if (timeOff) return mapToDto(timeOff, TimeOff);

    throw new NotFoundException(`TimeOff with id ${id} not found`);
  }

  async findAll() {
    const tasks = await this.timeOffRepository.findAll();
    return await Promise.all(tasks.map((x) => mapToDto(x, TimeOff)));
  }
}
