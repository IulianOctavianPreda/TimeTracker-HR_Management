import { Test } from '@nestjs/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = app.get<TaskService>(TaskService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!"', () => {
      // expect(service.getData()).toEqual({ message: 'Welcome to api!' });
    });
  });
});
