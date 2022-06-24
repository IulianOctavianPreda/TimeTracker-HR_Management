import { Test, TestingModule } from '@nestjs/testing';

import { TeamSettingsController } from './TeamSettings.controller';

describe('TeamSettingsController', () => {
  let controller: TeamSettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamSettingsController],
    }).compile();

    controller = module.get<TeamSettingsController>(TeamSettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
