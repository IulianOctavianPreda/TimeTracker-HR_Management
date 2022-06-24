import { Test } from '@nestjs/testing';

import { TeamSettingsService } from './TeamSettings.service';

describe('TeamSettingsService', () => {
  let service: TeamSettingsService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TeamSettingsService],
    }).compile();

    service = app.get<TeamSettingsService>(TeamSettingsService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
