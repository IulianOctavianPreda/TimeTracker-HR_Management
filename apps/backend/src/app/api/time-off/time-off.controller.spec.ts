import { Test, TestingModule } from '@nestjs/testing';

import { TimeOffController } from './timeOff.controller';

describe('TimeOffController', () => {
  let controller: TimeOffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeOffController],
    }).compile();

    controller = module.get<TimeOffController>(TimeOffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
