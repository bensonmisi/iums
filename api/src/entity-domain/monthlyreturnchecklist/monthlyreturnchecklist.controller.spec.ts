import { Test, TestingModule } from '@nestjs/testing';
import { MonthlyreturnchecklistController } from './monthlyreturnchecklist.controller';
import { MonthlyreturnchecklistService } from './monthlyreturnchecklist.service';

describe('MonthlyreturnchecklistController', () => {
  let controller: MonthlyreturnchecklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonthlyreturnchecklistController],
      providers: [MonthlyreturnchecklistService],
    }).compile();

    controller = module.get<MonthlyreturnchecklistController>(MonthlyreturnchecklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
