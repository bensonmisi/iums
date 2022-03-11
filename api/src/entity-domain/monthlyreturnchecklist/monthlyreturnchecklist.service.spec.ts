import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyreturnchecklistService } from './monthlyreturnchecklist.service';

describe('MonthlyreturnchecklistService', () => {
  let service: MonthlyreturnchecklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MonthlyreturnchecklistService],
    }).compile();

    service = module.get<MonthlyreturnchecklistService>(MonthlyreturnchecklistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
