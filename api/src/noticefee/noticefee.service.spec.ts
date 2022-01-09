import { Test, TestingModule } from '@nestjs/testing';
import { NoticefeeService } from './noticefee.service';

describe('NoticefeeService', () => {
  let service: NoticefeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticefeeService],
    }).compile();

    service = module.get<NoticefeeService>(NoticefeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
