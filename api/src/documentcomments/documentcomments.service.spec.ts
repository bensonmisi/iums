import { Test, TestingModule } from '@nestjs/testing';
import { DocumentcommentsService } from './documentcomments.service';

describe('DocumentcommentsService', () => {
  let service: DocumentcommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentcommentsService],
    }).compile();

    service = module.get<DocumentcommentsService>(DocumentcommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
