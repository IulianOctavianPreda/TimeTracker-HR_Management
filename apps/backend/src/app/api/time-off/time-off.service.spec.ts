import { Test } from '@nestjs/testing';

import { TimeOffService } from './timeOff.service';

describe('TimeOffService', () => {
  let service: TimeOffService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TimeOffService],
    }).compile();

    service = app.get<TimeOffService>(TimeOffService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
