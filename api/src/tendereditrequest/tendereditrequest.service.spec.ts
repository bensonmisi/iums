import { Test, TestingModule } from '@nestjs/testing';
import { TendereditrequestService } from './tendereditrequest.service';

describe('TendereditrequestService', () => {
  let service: TendereditrequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TendereditrequestService],
    }).compile();

    service = module.get<TendereditrequestService>(TendereditrequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
