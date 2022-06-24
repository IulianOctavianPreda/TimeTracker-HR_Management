import { Test } from '@nestjs/testing';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TeamService],
    }).compile();

    service = app.get<TeamService>(TeamService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
