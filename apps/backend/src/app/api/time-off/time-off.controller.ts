import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { TimeOff, TimeOffCreate, TimeOffDelete } from '../dtos/time-off.dto';
import { TimeOffService } from '../time-off/time-off.service';

@ApiTags('time-off')
@Controller('time-off')
export class TimeOffController {
  constructor(private timeOffService: TimeOffService) {}

  @Post('create')
  async createTimeOff(@Body() data: TimeOffCreate): Promise<TimeOff[]> {
    return await this.timeOffService.create(data);
  }

  @Post('delete')
  async deleteTimeOff(@Body() data: TimeOffDelete): Promise<TimeOff[]> {
    return await this.timeOffService.delete(data);
  }

  @Get(':id')
  async getTimeOff(@Param('id', ParseUUIDPipe) id: string): Promise<TimeOff> {
    return await this.timeOffService.findById(id);
  }

  @Get('time-offs')
  async getTimeOffs(): Promise<TimeOff[]> {
    return await this.timeOffService.findAll();
  }
}
