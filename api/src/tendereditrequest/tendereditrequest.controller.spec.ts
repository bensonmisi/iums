import { Test, TestingModule } from '@nestjs/testing';
import { TendereditrequestController } from './tendereditrequest.controller';
import { TendereditrequestService } from './tendereditrequest.service';

describe('TendereditrequestController', () => {
  let controller: TendereditrequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TendereditrequestController],
      providers: [TendereditrequestService],
    }).compile();

    controller = module.get<TendereditrequestController>(TendereditrequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
